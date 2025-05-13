import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    RouterModule, 
    MatButtonModule,
    MatTooltipModule // Asegúrate de tener esta importación
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() logout = new EventEmitter<void>();
  
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'shopping_cart', label: 'Alumnos', route: 'alumnos' },
    { icon: 'people', label: 'Gestion', route: 'gestion' },
    { icon: 'assessment', label: 'Ingreso', route: 'ingreso' },
    { icon: 'settings', label: 'Historial', route: 'historial' },
  ];

  constructor(public router: Router) {}

  onLogout() {
    this.logout.emit();
  }
}