import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Alumno {
  n: number;
  codigo: string;
  marca: string;
  modelo: string;
  grado: string;
  observacion: string;
  estado: 'Activo' | 'Inactivo' | 'En uso';
  fecha: string;
}

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent {
  alumnos: Alumno[] = [
    {
      n: 1,
      codigo: '4521B452DF452',
      marca: 'SAMSUNG',
      modelo: 'A25',
      grado: '5TO',
      observacion: 'La tablet se encuentra en un buen estado y está 100% cargada',
      estado: 'Activo',
      fecha: '2023-10-15' // Cambiado a formato de fecha real
    },
    {
      n: 2, // Número único para cada alumno
      codigo: '4521B452DF453',
      marca: 'SAMSUNG',
      modelo: 'A25',
      grado: '5TO',
      observacion: 'La tablet presenta fallas en la pantalla táctil',
      estado: 'Inactivo',
      fecha: '2023-11-20' // Cambiado a formato de fecha real
    },
    {
      n: 3,
      codigo: '4521B452DF454',
      marca: 'HUAWEI',
      modelo: 'MediaPad',
      grado: '4TO',
      observacion: 'Tablet actualmente en uso por el estudiante',
      estado: 'En uso',
      fecha: '2023-12-05' // Cambiado a formato de fecha real
    }
  ];

  estadosDisponibles: ('Activo' | 'Inactivo' | 'En uso')[] = ['Activo', 'Inactivo', 'En uso'];

  editarAlumno(id: number) {
    console.log('Editar alumno con ID:', id);
    // Lógica para editar el alumno
    const alumno = this.alumnos.find(a => a.n === id);
    if (alumno) {
      // Aquí iría la lógica para abrir un modal/formulario de edición
      alert(`Editando alumno: ${alumno.codigo}`);
    }
  }

  eliminarAlumno(id: number) {
    console.log('Eliminar alumno con ID:', id);
    // Lógica para eliminar el alumno
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.alumnos = this.alumnos.filter(a => a.n !== id);
    }
  }
}