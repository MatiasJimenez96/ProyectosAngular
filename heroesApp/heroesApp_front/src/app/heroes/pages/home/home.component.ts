import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  get usuario() {
    return { ...this.authService.usuario }
  }

  router = inject(Router);

  authService = inject(AuthService);
  //constructor( private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['./auth'])
  }

}
