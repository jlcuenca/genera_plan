import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Importa tu configuración

// Este comando inicia tu aplicación.
// Es crucial que 'appConfig' se pase aquí para que los proveedores
// (como CurriculumService y HttpClient) estén disponibles globalmente.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
