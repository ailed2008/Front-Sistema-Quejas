import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 🔓 Ignorar rutas de autenticación
  if (req.url.includes('/api/auth/')) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedReq);
  }
  return next(req);
};