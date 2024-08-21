import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { HeaderComponent } from '@ng-mf/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isUserLoggedIn$;
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }
}
