import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/loginComponents/login/login.component';
import { IndexComponent } from './features/main/layout/index/index.component';
import { DashboardComponent } from './features/main/pages/dashboard/dashboard.component';
import { AlumnosComponent } from './features/main/pages/alumnos/alumnos.component';
import { GestionComponent } from './features/main/pages/gestion/gestion.component';
import { IngresoComponent } from './features/main/pages/ingreso/ingreso.component';
import { HistorialComponent } from './features/main/pages/historial/historial.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'index', 
    component: IndexComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'gestion', component: GestionComponent },
      { path: 'ingreso', component: IngresoComponent },
      { path: 'historial', component: HistorialComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
    ]
  }
];