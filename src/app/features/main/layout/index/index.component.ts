import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import{Router} from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [MenuComponent, HeaderComponent, SidebarComponent,MatSidenavModule, MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  isSidebarCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  handleLogout() {
    // Aquí iría tu lógica de cierre de sesión
    console.log('Sesión cerrada');
    this.router.navigate(['login']);
  }
}
