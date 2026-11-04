import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuejaService } from '../../services/queja';
import { QuejaResponse } from '../../models/queja.model';

@Component({
  selector: 'app-lista-quejas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-quejas.html',
  styleUrls: ['./lista-quejas.scss']
})
export class ListaQuejasComponent implements OnInit {
  quejas: QuejaResponse[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

constructor(
    private quejaService: QuejaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarQuejas();
  }
/*
  cargarQuejas(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.quejaService.listarQuejas().subscribe({
      next: (data) => {
        this.quejas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false; // ¡Desactiva el "cargando" para que no se quede colgado!
        
        // Detectar si es un error de permisos (403) o de autenticación (401)
        if (err.status === 403) {
          this.mensajeError = '❌ Acceso denegado (403): Tu usuario no tiene el rol necesario (ADMIN o EJECUTIVO) para ver las quejas.';
        } else if (err.status === 401) {
          this.mensajeError = '❌ No autorizado (401): Tu sesión expiró o el token no es válido.';
        } else {
          this.mensajeError = `❌ Error al cargar las quejas (Código ${err.status}): ${err.error?.mensaje || err.message}`;
        }
        
        console.error('Detalle del error:', err);
      }
    });
  }
  */

cargarQuejas(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.quejaService.listarQuejas().subscribe({
      next: (data) => {
        this.quejas = data;
        this.cargando = false;
        this.cdr.markForCheck(); // Fuerza la actualización de la vista de forma segura
      },
      error: (err) => {
        this.cargando = false;
        this.cdr.markForCheck();
        this.mensajeError = 'No se pudieron cargar las quejas. Verifique su conexión o permisos.';
        console.error('Error al listar quejas:', err);
      }
    });
}
}