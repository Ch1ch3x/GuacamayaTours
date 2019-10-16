import { itinerario } from './itinerario';
import { persona } from './persona';

export interface orden {
    persona: persona;
    correo: string;
    telefono: number;
    direccion: string;
    ordenId: [string];
    estatus: boolean;
    localizador: number;
    itinerario: itinerario;
}