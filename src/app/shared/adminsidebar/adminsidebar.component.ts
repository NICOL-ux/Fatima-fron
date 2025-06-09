import {
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminsidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.scss'],
})
export class AdminsidebarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed = false;

  menuItems = [
    { icon: 'people', label: 'Usuarios', route: '/admin/dashboard' },
    // Puedes agregar más rutas absolutas aquí si deseas
  ];

  userName = '';
  userEmail = '';
  userInitials = '';

  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        const fullName = `${user.firstName} ${user.lastName}`.trim();
        this.userName = fullName;
        this.userEmail = user.email;
        this.userInitials = this.getInitials(fullName);
      } else {
        this.userName = '';
        this.userEmail = '';
        this.userInitials = '';
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  private getInitials(name: string): string {
    const words = name.split(' ');
    return words
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join('');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']); // Ir al login (raíz)
  }
}
