import { persona } from './persona';

export interface orden {
    cliente: persona;
    correo: string;
    telefono: number;
    direccion: string;
    ordenId: number;
    estatus: boolean;
    localizador: number;
    itinerario: [number, number, string, string, string, number, persona ?];
    //localizador, id, fechaLlegada, fechaSalida, TipoHabitacion, CostoTotal, Integrantes
    desahabilitar: boolean;
}