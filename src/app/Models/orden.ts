import { persona } from './persona';

export interface orden {
    nombre: string;
    apellido: string;
    cedula: number;
    edad: number;
    correo: string;
    telefono: number;
    direccion: string;
    ordenId: number;
    estatus: boolean;
    localizador: number;
    itinerario: [number, number, string, string, string, number, persona ?, persona ?, persona ?];
    //localizador, id, fechaLlegada, fechaSalida, TipoHabitacion, CostoTotal, Integrantes
}