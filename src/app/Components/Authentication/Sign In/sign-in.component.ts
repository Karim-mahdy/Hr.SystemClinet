import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  Submitted: boolean = false;
  FormLogin = new FormGroup({
    emailOrUserName: new FormControl('Admin@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Admin@123', Validators.required),
  });

  constructor(
    private AuthenticationService: AuthenticationService,
    private _router: Router
  ) {}

  get FormControls() {
    return this.FormLogin.controls;
  }

  apiError: string = '';
  OnSubmit(e: Event) {
    e.preventDefault();
    this.Submitted = true;

    if (this.FormLogin.valid) {
      this.AuthenticationService.login(this.FormLogin.value).subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem('userToken', response.token);
            this.AuthenticationService.decodeUserData(); 
            this._router.navigate(['/Dashboard']);
          }
        },
        error: (err) => {
          console.log(err);
          this.apiError = err.error.title;
        },
      });
    }
  }
  

}