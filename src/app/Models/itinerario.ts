import { persona } from './persona';

export interface itinerario {
    localizador: [number];
    hotelId: [number];
    fechaLlegada:[string];
    fechaSalida:[string];
    tipoDeHabitacion:[string];
    costoTotal: number;
    integrantes: [persona];
}