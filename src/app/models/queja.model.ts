export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA';
export type EstadoQueja = 'REGISTRADA' | 'EN_INVESTIGACION' | 'DICTAMINADA' | 'CERRADA';

export interface QuejaTarjetaRequest {
    folio: string;
    numCliente: string;
    montoReclamado: number;
    prioridad: Prioridad;
    lugarSuceso: string;
    horaTransaccion: string;
}

export interface QuejaResponse {
    folio: string;
    receptionDate: string;
    customerNumber: string;
    claimedAmount: number;
    prioridad: Prioridad;
    estado: EstadoQueja;
    incidentLocation: string;
    ruling?: string;
}
