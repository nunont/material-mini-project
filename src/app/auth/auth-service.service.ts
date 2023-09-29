import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  login = new Observable<boolean>();
  txtNavBarLoginText = "Login";
  userData : any;

  constructor(
    public fbAuth: AngularFireAuth,
    public router : Router
  ) { 
    this.fbAuth.authState.subscribe(user => {
      if (user) {
        //AUtenticado
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.login = of(true);
        this.txtNavBarLoginText = "Logout";
        this.router.navigate(['home'], {replaceUrl: true})
      }
      else {
        //No autenticado
        this.login = of(false);
        localStorage.setItem('user', "");
        this.txtNavBarLoginText = "Login";
        this.router.navigate(['login']);
      }
    });
  }

  SignUp(email: string, password: string) : Observable<any> {
    return of(this.fbAuth.createUserWithEmailAndPassword(email, password));
  }

  SignIn(email: string, password: string) : Observable<any> {
    return of(this.fbAuth.signInWithEmailAndPassword(email, password));
  }

  LogOut() {
    this.fbAuth.signOut();
  }

}
