import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // CORRECCIÓN: Usar el método isAuthenticated del servicio
  if (authService.isAuthenticated) {
    return true; // Si está autenticado, permite el acceso
  }

  // Si no está autenticado, lo redirige a la página de login
  router.navigate(['/login']);
  return false;
};