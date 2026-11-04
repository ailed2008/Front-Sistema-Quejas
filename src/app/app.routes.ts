import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { RegistrarQueja } from './components/registrar-queja/registrar-queja';
import { authGuard } from './guards/auth-guard';
import { ListaQuejasComponent } from './components/lista-quejas/lista-quejas';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Esta ruta ahora está protegida por el guard:
  { 
    path: 'registro-queja', 
    component: RegistrarQueja, 
    canActivate: [authGuard] 
  },
  { 
  path: 'lista-quejas', 
  component: ListaQuejasComponent, 
  canActivate: [authGuard] 
},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];