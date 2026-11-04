import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  cargando: boolean = false;
  mensajeRespuesta: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['EJECUTIVO', [Validators.required]]   // el backend espera "rol"
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeRespuesta = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.cargando = false;
        this.esError = false;
        this.mensajeRespuesta = '¡Usuario registrado con éxito! Redirigiendo al login...';
        this.registerForm.reset({ role: 'EJECUTIVO' });
        
        // Opcional: Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.cargando = false;
        this.esError = true;
        this.mensajeRespuesta = 'Error al registrar el usuario. Es posible que el usuario ya exista.';
      }
    });
  }
}