import { fullday } from './fullday';
import { habitaciones } from './tipo-de-habitaciones';
import { itinerario } from './itinerario';

export interface hotel{
    hotelId: [number];
    nombre: [string];
    estrellas: [number];
    latitud:[string];
    longitud:[string];
    direccion:[string];
    estado:[string];
    fotos:[string];
    ciudad:[string];
    fullday: fullday;
    servicios: [];
    tipoHabitaciones: [habitaciones];
}