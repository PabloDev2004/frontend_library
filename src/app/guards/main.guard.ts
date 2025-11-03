import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { map, take } from 'rxjs/operators';

export const mainGuard: CanActivateFn = (route, state) => {
  
  console.warn('--- MODO DE BYPASS TEMPORAL ACTIVO ---');
  console.warn('mainGuard está permitiendo todo el acceso. No olvides restaurarlo.');
  return true; // <-- ¡AQUÍ ESTÁ EL BYPASS! Siempre permite el acceso.

  
  /*const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );*/
};