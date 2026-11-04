import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar que el token no esté expirado decodificando el payload
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expMs = payload.exp * 1000;
    if (Date.now() > expMs) {
      authService.logout(); // limpia token y rol del localStorage
      router.navigate(['/login']);
      return false;
    }
  } catch {
    authService.logout();
    router.navigate(['/login']);
    return false;
  }

  return true;
};
