import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService, User } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed = false;
  @Output() logout = new EventEmitter<void>();

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { icon: 'people', label: 'Alumnos', route: 'alumnos' },
    { icon: 'school', label: 'Gestion', route: 'gestion' },
    { icon: 'payments', label: 'Ingreso', route: 'ingreso' },
    { icon: 'history', label: 'Historial', route: 'historial' },
  ];

  userName = '';
  userEmail = '';
  userInitials = '';

  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.userEmail = user.email;
        this.userInitials = this.getInitials(user.name);
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
    const initials = words.slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('');
    return initials;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.logout.emit();
  }
}
