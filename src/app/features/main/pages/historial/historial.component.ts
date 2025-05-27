import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../../core/services/history.service';
import { History } from '../../../../core/models/history.model';
import { CommonModule } from '@angular/common';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule]
})
export class HistorialComponent implements OnInit {
  historial: History[] = [];
  filteredHistorial: History[] = [];
  filtroTexto: string = '';

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getAll().subscribe({
      next: (data) => {
        this.historial = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error al cargar el historial:', err);
      }
    });
  }

  applyFilter(): void {
    const texto = this.filtroTexto.trim().toLowerCase();
    if (!texto) {
      this.filteredHistorial = [...this.historial];
      return;
    }

    this.filteredHistorial = this.historial.filter(item => {
      const action = item.action?.toLowerCase() || '';
      const mensaje = this.getMensaje(item).toLowerCase();
      return action.includes(texto) || mensaje.includes(texto);
    });
  }

  getMensaje(item: History): string {
    return (item as any).description || (item as any).message || 'Sin descripción';
  }

  getFecha(item: History): Date | null {
    if (!item.createdAt) return null;
    return new Date(item.createdAt);
  }

  generarPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Historial de Aulas', 14, 15);

    const rows = this.filteredHistorial.map(item => [
      item.action,
      this.getMensaje(item),
      this.getFecha(item)?.toLocaleString() || 'Fecha no disponible'
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['Acción', 'Mensaje', 'Fecha']],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] }
    });

    doc.save('historial_aulas.pdf');
  }
}
