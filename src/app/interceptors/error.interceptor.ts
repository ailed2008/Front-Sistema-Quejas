import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorLog = {
        url: req.url,
        method: req.method,
        status: error.status,
        message: error.message,
        timestamp: new Date().toISOString()
      };

      // Imprimir un log detallado en la consola del navegador
      console.error('🚨 [LOG DE ERROR FRONTEND]:', errorLog);

      if (error.status === 0) {
        console.warn('⚠️ Posible problema de CORS o el servidor backend está apagado.');
      }

      return throwError(() => error);
    })
  );
};