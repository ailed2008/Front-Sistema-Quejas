import { Component, signal } from '@angular/core';
import { RouterOutlet,Router, NavigationEnd } from '@angular/router';
import { RegistrarQueja } from './components/registrar-queja/registrar-queja';
import { NavbarComponent } from './components/navbar/navbar';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, NavbarComponent,CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  template: `
    <main class="bg-light min-vh-100">
      <!-- Barra de navegación superior (Se oculta en login y register) -->
      @if (showNavbar()) {
        <app-navbar></app-navbar>
      }
      
      <!-- Contenedor dinámico donde se cargan las rutas -->
      <div class="py-4">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  //  templateUrl:'./app.html',
})
export class App {
  protected readonly title = signal('queja-frontend');
  protected showNavbar=signal(true);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      // Oculta el navbar si la ruta contiene 'login' o 'register'
      this.showNavbar.set(!url.includes('/login') && !url.includes('/register'));
    });
  }
}
