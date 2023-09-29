import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  submitted = false;
  showSpinner = false;
  showMessage = false;

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(public authService: AuthServiceService) { 
  }

  get fullName() { return this.registrationForm.get('fullName'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  register(){
    if (this.registrationForm.invalid){
      alert("Invalid form")
      return;
    }

    let email = this.email?.value ?? "";
    let password = this.password?.value ?? "";

    this.authService.SignUp(email, password)
    .subscribe(response => {
      console.log(response);
    });

  }




}
