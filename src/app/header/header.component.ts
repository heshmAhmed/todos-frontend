import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  username: string;
  userSub?: Subscription;

  constructor(private authService: AuthService) {
    this.username = 'User';
    this.isAuthenticated = false;
    this.userSub = this.authService.userObservable.subscribe((user) => {
      if (!!user) {
        this.username = user.username;
        this.isAuthenticated = true;
      } else {
        this.username = 'User';
        this.isAuthenticated = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
  }
}
