import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  error: string = null!;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid && form.value.password == form.value.conpassword) {
      let firstname = form.value.firstname;
      let lastname = form.value.lastname;
      let email = form.value.email;
      let password = form.value.password;
      this.isLoading = true;
      this.authService.signUp(firstname, lastname, email, password).subscribe(
        () => {
          this.isLoading = false;
          form.reset();
          this.router.navigate(['auth']);
        },
        () => {
          this.isLoading = false;
          this.error = 'Email already used!';
        }
      );
    }
  }
}
