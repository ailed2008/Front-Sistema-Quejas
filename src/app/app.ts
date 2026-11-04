import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarQueja } from './components/registrar-queja/registrar-queja';
import { NavbarComponent } from './components/navbar/navbar';
@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  template: `
    <main class="bg-light min-vh-100">
      <!-- Barra de navegación superior -->
      <app-navbar></app-navbar>
      
      <!-- Contenedor dinámico donde se cargan las rutas (Login, Registro, Quejas, etc.) -->
      <div class="py-4">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  //  templateUrl:'./app.html',
})
export class App {
  protected readonly title = signal('queja-frontend');
}
