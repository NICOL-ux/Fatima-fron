import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AdminsidebarComponent } from '../../../../shared/adminsidebar/adminsidebar.component';
import { MenuComponent } from '../menu/menu.component';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    AdminsidebarComponent,
    MenuComponent,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  handleLogout() {
    this.authService.logout(); // Usar servicio para limpiar sesión
    this.router.navigate(['']);
  }
}
