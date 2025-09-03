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
    // Agrega más ítems si lo necesitas
  ];

  userName = '';
  userEmail = '';
  userInitials = '';

  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();

        this.userName = fullName || user.email;
        this.userEmail = user.email;
        this.userInitials = this.getInitials(fullName || user.email);
      } else {
        this.clearUserInfo();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']); // Redirigir al login
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

  private clearUserInfo(): void {
    this.userName = '';
    this.userEmail = '';
    this.userInitials = '';
  }
}
