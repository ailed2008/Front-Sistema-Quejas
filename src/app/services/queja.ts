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
}