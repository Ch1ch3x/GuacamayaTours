import { fullday } from './fullday';

export interface hotel{
    hotelId: number;
    nombre: string;
    estrellas: number;
    latitud:string;
    longitud:string;
    direccion:string;
    estado:string;
    fotos:[string];
    ciudad:[string];
    fullday: [boolean, number];
    servicios: [boolean, boolean, boolean, boolean];
    tipoHabitaciones: [string, [string], string, number, [string], number];
    // nombre, fotos, tipo de vista, maxPersonas, Comodidades, Costo por noche
}