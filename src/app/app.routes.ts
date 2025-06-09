import { Routes } from '@angular/router';
import { IndexComponent } from './features/main/layout/index/index.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminLayoutComponent } from './features/main/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  // Ruta de login (pública)
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/loginComponents/login/login.component').then(m => m.LoginComponent),
  },

  // Rutas para ADMIN
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/main/admin/usuarios/usuarios.component').then(m => m.UsuariosComponent),
      },
      // Puedes añadir más rutas exclusivas del administrador aquí
    ],
  },

  // Rutas para USUARIO o ADMIN (modo usuario general)
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/main/pages/alumnos/alumnos.component').then(m => m.AlumnosComponent),
      },
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./features/main/pages/alumnos/alumnos.component').then(m => m.AlumnosComponent),
      },
      {
        path: 'gestion',
        loadComponent: () =>
          import('./features/main/pages/gestion/gestion.component').then(m => m.GestionComponent),
      },
      {
        path: 'ingreso',
        loadComponent: () =>
          import('./features/main/pages/ingreso/ingreso.component').then(m => m.IngresoComponent),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./features/main/pages/historial/historial.component').then(m => m.HistorialComponent),
      },
      {
        path: 'aulas',
        loadComponent: () =>
          import('./features/main/pages/aulas/aulas.component').then(m => m.AulasComponent),
      },
    ],
  },

  // Ruta wildcard (no encontrada)
  {
    path: '**',
    redirectTo: '',
  },
];
