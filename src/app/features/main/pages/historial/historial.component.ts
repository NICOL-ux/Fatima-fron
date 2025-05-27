import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../../core/services/history.service';
import { History } from '../../../../core/models/history.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HistorialComponent implements OnInit {
  historial: History[] = [];
  filteredHistorial: History[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.getAll().subscribe(data => {
      this.historial = data;
      this.filteredHistorial = data.filter(item => item.entityType === 'Classroom'); // Solo aulas
    });
  }
}
