// src/app/curriculum.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanDeEstudios } from './curriculum.model';

// Asegúrate de que esta URL sea la correcta
const environment = {
  apiUrl: 'https://genera-plan-backend.onrender.com/api'
};

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlanDeEstudios(planId: string): Observable<PlanDeEstudios> {
    return this.http.get<PlanDeEstudios>(`${this.apiUrl}/plan-de-estudios/${planId}`);
  }

  saveFullCurriculum(planId: string, plan: PlanDeEstudios): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/plan-de-estudios/${planId}`, { data: plan });
  }
}