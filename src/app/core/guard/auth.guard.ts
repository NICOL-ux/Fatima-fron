import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const allowedRoles = route.data['roles'] as string[] | undefined;

    return this.authService.user$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // No está autenticado: redirige a login
          return this.router.createUrlTree(['']);
        }

        // Si la ruta especifica roles, verifica que el usuario tenga uno permitido
        if (allowedRoles && allowedRoles.length > 0) {
          if (!user.role || !allowedRoles.includes(user.role)) {
            // Usuario no autorizado, redirige a página principal para usuarios comunes
            return this.router.createUrlTree(['/index']);
          }
        }

        // Usuario autenticado y autorizado
        return true;
      })
    );
  }
}
