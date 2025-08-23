import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CurriculumService } from './curriculum.service'; // <-- Asegúrate de que esta línea exista

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    CurriculumService // <-- Y que esta línea también exista
  ]
};