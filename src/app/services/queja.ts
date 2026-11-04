import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuejaResponse, QuejaTarjetaRequest } from '../models/queja.model';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class QuejaService{
    private apiUrl = `${environment.apiUrl}/quejas`;
    constructor(private http: HttpClient, private authService: AuthService){
    }

    listarQuejas() : Observable<QuejaResponse[]>{
        return this.http.get<QuejaResponse[]>(this.apiUrl);
    }

    registrarQuejaTarjeta(dto: QuejaTarjetaRequest) : Observable<string>{
        return this.http.post(`${this.apiUrl}/tarjeta`, dto, {responseType: 'text'});
    }

    eliminarQueja(folio: string): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${folio}`, { responseType: 'text' });
    }

    emitirDictamen(folio: string, textoDictamen: string): Observable<string> {
        return this.http.patch(`${this.apiUrl}/${folio}/dictamen`, textoDictamen, {
            responseType: 'text',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    cambiarEstado(folio: string, nuevoEstado: string): Observable<string> {
        return this.http.patch(`${this.apiUrl}/${folio}/estado`, null, {
            params: { nuevoEstado },
            responseType: 'text'
        });
    }
}