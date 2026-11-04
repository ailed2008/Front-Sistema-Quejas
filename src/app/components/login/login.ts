import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-login',
  standalone: true, // Si usas componentes standalone en Angular
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cargando: boolean = false;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.cargando = false;
        // Redirige al panel o vista principal de quejas tras iniciar sesión con éxito
        this.router.navigate(['/registro-queja']); 
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }
}