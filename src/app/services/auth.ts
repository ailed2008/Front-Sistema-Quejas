import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          // El backend ya devuelve el rol directamente en la respuesta
          if (response.rol) {
            localStorage.setItem('rol', response.rol);
          } else {
            this.setRolFromToken(response.token);
          }
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  /** Decodifica el JWT y guarda el rol en localStorage */
  private setRolFromToken(token: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Spring Security guarda los roles en "roles" o "role" según configuración
      const rol: string =
        payload.rol ||
        payload.role ||
        (payload.roles && payload.roles[0]) ||
        (payload.authorities && payload.authorities[0]?.replace('ROLE_', '')) ||
        '';
      localStorage.setItem('rol', rol.replace('ROLE_', ''));
    } catch {
      localStorage.setItem('rol', '');
    }
  }

  getRol(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('rol');
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRol() === 'ADMIN';
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}