import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { map, take } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {
  
  console.warn('--- MODO DE BYPASS TEMPORAL ACTIVO ---');
  console.warn('loginGuard está permitiendo todo el acceso. No olvides restaurarlo.');
  return true; // <-- ¡AQUÍ ESTÁ EL BYPASS!

  /*const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        const role = authService.getRole();
        if (role === 'Admin') {
          router.navigate(['/libros']);
        } else {
          router.navigate(['/prestamos']);
        }
        return false;
      }
      return true; 
    })
  );*/
};