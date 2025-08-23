import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // Ruta por defecto que redirige a un plan de ejemplo.
  // Puedes cambiar 'economia-2024' por la clave que prefieras como default.
  {
    path: '',
    redirectTo: '/plan/economia-2024',
    pathMatch: 'full'
  },
  // Ruta que captura el ID del plan de estudios desde la URL.
  // El componente AppComponent se encargará de cargar los datos correspondientes.
  {
    path: 'plan/:planId',
    component: AppComponent
  },
  // Una ruta "catch-all" por si el usuario navega a una URL no definida.
  {
    path: '**',
    redirectTo: '/plan/economia-2024'
  }
];
