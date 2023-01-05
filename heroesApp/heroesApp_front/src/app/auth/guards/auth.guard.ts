import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion()
      .pipe(
        tap(estaAuntenticado => {
          if (!estaAuntenticado) {
            console.log('No esta autenticado canActivate');
            this.router.navigate(['./auth/login']);
          }
        })
      );
    /* if (this.authService.usuario.id) {
      return true;
    }
    console.log('Bloqueado por el AuthGuard - canActivate');
    console.log('Debes logearte!');
    return false; */
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap(estaAuntenticado => {
        if (!estaAuntenticado) {
          console.log('No esta autenticado canLoad');
          this.router.navigate(['./auth/login']);
        }
      })
    );
    /* if (this.authService.usuario.id) {
      return true;
    }
    console.log('Bloqueado por el AuthGuard - canLoad');
    console.log('Debes logearte!');
    return false; */
  }
}
