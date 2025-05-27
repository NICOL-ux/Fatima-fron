import { Routes } from '@angular/router';
import { IndexComponent } from './features/main/layout/index/index.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/loginComponents/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/main/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  // Redireccionar cualquier ruta no encontrada al login o dashboard según prefieras
  {
    path: '**',
    redirectTo: '', // redirige al login si no existe ruta
  },
];