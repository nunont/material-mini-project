import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  @Output() public sideNavToggle = new EventEmitter();
  userLogged = false;

  constructor(public authService: AuthServiceService) {
    this.authService.login.subscribe((response) => {
      this.userLogged = response;
    });
    
  }

  logOut() {
    this.authService.LogOut();
  }
  

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
}
