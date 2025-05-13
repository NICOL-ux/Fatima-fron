import { Component } from '@angular/core';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  grado: string;
  dni: string;
  seccion: string;
  anioEscolar: string;
  telefono: string;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  alumnos: Alumno[] = [
    {
      id: 1,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024',
      telefono: 'GONAZLES'
    },
    {
      id: 2,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024r',
      telefono: 'GONAZLES'
    },
    {
      id: 3,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024r',
      telefono: 'GONAZLES'
    },
    {
      id: 4,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024r',
      telefono: 'GONAZLES'
    },
    {
      id: 5,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024r',
      telefono: 'GONAZLES'
    },
    {
      id: 6,
      nombre: 'estudante',
      apellido: 'apellido1',
      grado: 'A2',
      dni: '452632589',
      seccion: 'U',
      anioEscolar: '2024r',
      telefono: 'GONAZLES'
    }
  ];

  editarAlumno(id: number) {
    console.log('Editar alumno con ID:', id);
    // Lógica para editar alumno
  }

  eliminarAlumno(id: number) {
    console.log('Eliminar alumno con ID:', id);
    // Lógica para eliminar alumno
  }
}