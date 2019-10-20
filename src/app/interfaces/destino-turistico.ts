import { tipoDeDestino } from './tipo-de-destinos';

export interface destinosTuristico {
    destinosId: [string];
    nombre: string;
    descripcion: string;
    tipoDeDestino: tipoDeDestino;
    servicios: []; //preguntar
    actividades: []; //preguntar
    latitud: [string];
    longitud: [string];
    estado: String;
    ciudad: String;
    direccion: String;

}