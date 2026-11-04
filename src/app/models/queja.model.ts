export type Prioridad='BAJA'|'MEDIA'|'ALTA';
export type EstadoQueja ='REGISTRADA' | 'EN_INVESTIGACION' | 'DICTAMINADA'| 'CERRADA';

export interface QuejaTarjetaRequest{
    folio:string;
    numCliente: string;
    prioridad: Prioridad;
    lugarSuceso: string;
    horaTransaccion: string; // Formato ISO string (ej. '2026-10-30T10:15:30')
}

export interface QuejaResponse{
    folio: string;
    fechaRecepcion: string;
    numCliente: string;
    montoReclamado: number;
    prioridad: Prioridad;
    estado: EstadoQueja;
    textoDictamen?: string;
    lugarSuceso: string;
    
}