import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {QuejaService } from '../../services/queja';
import {QuejaTarjetaRequest } from '../../models/queja.model';
import { response } from 'express';


@Component({
  selector: 'app-registrar-queja',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './registrar-queja.scss',
  templateUrl: './registrar-queja.html',
})
export class RegistrarQueja {
  quejaForm: FormGroup;
  mensajeRespuesta: string='';
  esError: boolean=false;
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private quejaService: QuejaService){
    this.quejaForm = this.fb.group({
      folio: ['',[Validators.required, Validators.minLength(3)]],
      numCliente: ['', [Validators.required]],
      montoReclamado:[null, [Validators.required, Validators.min(0.01)]],
      prioridad:['MEDIA',[Validators.required]],
      lugarSuceso:['',[Validators.required]],
      horaTransaccion:['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.quejaForm.invalid){
      this.quejaForm.markAllAsTouched();
      return;
    }
    this.cargando=true;
    this.mensajeRespuesta='';
    
    const formData: QuejaTarjetaRequest = this.quejaForm.value;

    this.quejaService.registrarQuejaTarjeta(formData).subscribe({
      next:(response) =>{
        this.cargando = false;
        this.esError = false;
        this.mensajeRespuesta=response;
        this.quejaForm.reset({ prioridad: 'MEDIA'});
      },
      error: (err) => {
        this.cargando=false;
        this.esError = true;
        this.mensajeRespuesta= err.error || 'Ocurrio un error al registrar la queja.'
      }
    });

  }
}
