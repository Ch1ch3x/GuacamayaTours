import { Hotel } from './hotel';
import { Estado } from './estado';
import { destinoTuristico } from './destinoTuristico';

export const HOTELES: Hotel[] = [
    
    {
        hotelId: [3333],
        nombre: ['Hotel Hesperia'],
        estrellas: [5],
        latitud:["555"],
        longitud:["555"],
        direccion:['Valle de Pedro González, Playa Puerto Viejo, 6301'],
        estado:['Nueva Esparta'],
        fotos:['assets/img/hotel1.jpg'],
        ciudad:['La Asuncion'],
        fullday: [false, 0],
        servicios: [true, true, true, true],
        tipoHabitaciones: ['Suite', ['simple'], 'Doble', 5, ['doble']]
    
    },{
        hotelId: [3333],
        nombre: ['Hotel Hesperia'],
        estrellas: [5],
        latitud:["555"],
        longitud:["555"],
        direccion:['Valle de Pedro González, Playa Puerto Viejo, 6301'],
        estado:['Nueva Esparta'],
        fotos:['assets/img/hotel1.jpg'],
        ciudad:['La Asuncion'],
        fullday: [false, 0],
        servicios: [true, true, true, true],
        tipoHabitaciones: ['Suite', ['simple'], 'Doble', 5, ['doble']]
    
    },{
        hotelId: [3333],
        nombre: ['Hotel Hesperia'],
        estrellas: [5],
        latitud:["555"],
        longitud:["555"],
        direccion:['Valle de Pedro González, Playa Puerto Viejo, 6301'],
        estado:['Nueva Esparta'],
        fotos:['assets/img/hotel1.jpg'],
        ciudad:['La Asuncion'],
        fullday: [false, 0],
        servicios: [true, true, true, true],
        tipoHabitaciones: ['Suite', ['simple'], 'Doble', 5, ['doble']]
    
    }
]

export const ESTADOS: Estado[]=[
    
    {    estadoId: 'Falcón',
        nombre: 'Falcón',
        imagen: ['']
    },
    {    estadoId: 'Zulia',
        nombre: 'Zulia',
        imagen: ['']
    }
]

export const DESTINOS: destinoTuristico[]=[
    
    {
        destinosId: ['Tucacas'],
        nombre: 'Tucacas',
        descripcion: 'Playa',
        servicios: ['Lanchas,hoteles,cayos'], //preguntar
        actividades: ['Playas y hoteles'], //preguntar
        latitud: ['00.00.00'],
        longitud: ['00.00.00'],
        estado: 'Falcón',
        ciudad: 'Falcón',
        direccion: 'Ciudad capital del Municipio José Laurencio Silva del estado Falcón, en Venezuela',
        imagenes: ['']
    },{
        destinosId: ['Tucacas'],
        nombre: 'Tucacas',
        descripcion: 'Playa',
        servicios: ['Lanchas,hoteles,cayos'], //preguntar
        actividades: ['Playas y hoteles'], //preguntar
        latitud: ['00.00.00'],
        longitud: ['00.00.00'],
        estado: 'Falcón',
        ciudad: 'Falcón',
        direccion: 'Ciudad capital del Municipio José Laurencio Silva del estado Falcón, en Venezuela',
        imagenes: ['']
    }

]
   
