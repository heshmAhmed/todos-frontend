import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoading: boolean = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;

    this.authService.logIn(form.value.email, form.value.password).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['todos']);
      },
      () => {
        this.isLoading = false;
        this.error = 'Wrong email or password!';
      }
    );
    form.reset();
  }
}
