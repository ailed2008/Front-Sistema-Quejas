import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuejaService } from '../../services/queja';
import { AuthService } from '../../services/auth';
import { QuejaResponse } from '../../models/queja.model';

@Component({
  selector: 'app-lista-quejas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-quejas.html',
  styleUrls: ['./lista-quejas.scss']
})
export class ListaQuejasComponent implements OnInit {
  quejas: QuejaResponse[] = [];
  cargando: boolean = true;
  mensajeError: string = '';
  mensajeExito: string = '';

  // Modal dictamen
  folioSeleccionado: string = '';
  textoDictamen: string = '';
  mostrarModalDictamen: boolean = false;

  constructor(
    private quejaService: QuejaService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  get esAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.cargarQuejas();
  }

  cargarQuejas(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.quejaService.listarQuejas().subscribe({
      next: (data) => {
        this.quejas = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.cargando = false;
        this.cdr.markForCheck();
        this.mensajeError = 'No se pudieron cargar las quejas. Verifique su conexión o permisos.';
        console.error('Error al listar quejas:', err);
      }
    });
  }

  eliminar(folio: string): void {
    if (!confirm(`¿Seguro que deseas eliminar la queja ${folio}? Esta acción no se puede deshacer.`)) return;

    this.quejaService.eliminarQueja(folio).subscribe({
      next: () => {
        this.quejas = this.quejas.filter(q => q.folio !== folio);
        this.mensajeExito = `✅ Queja ${folio} eliminada correctamente.`;
        this.cdr.markForCheck();
        setTimeout(() => { this.mensajeExito = ''; this.cdr.markForCheck(); }, 4000);
      },
      error: (err) => {
        this.mensajeError = `❌ Error al eliminar la queja ${folio}.`;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  abrirModalDictamen(folio: string): void {
    this.folioSeleccionado = folio;
    this.textoDictamen = '';
    this.mostrarModalDictamen = true;
  }

  cerrarModalDictamen(): void {
    this.mostrarModalDictamen = false;
    this.folioSeleccionado = '';
    this.textoDictamen = '';
  }

  confirmarDictamen(): void {
    if (!this.textoDictamen.trim()) return;

    this.quejaService.emitirDictamen(this.folioSeleccionado, this.textoDictamen).subscribe({
      next: () => {
        this.mensajeExito = `✅ Dictamen emitido para la queja ${this.folioSeleccionado}.`;
        this.cerrarModalDictamen();
        this.cargarQuejas();
        setTimeout(() => { this.mensajeExito = ''; this.cdr.markForCheck(); }, 4000);
      },
      error: (err) => {
        this.mensajeError = `❌ Error al emitir el dictamen.`;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }
}
