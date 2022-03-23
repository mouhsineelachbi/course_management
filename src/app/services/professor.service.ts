import { Observable } from 'rxjs';
import { Professor } from './../models/professor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig, AppConfigService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  config: string;
  professorUrl: string

  constructor(private http: HttpClient, private configs: AppConfigService) { 
    this.config = configs.getConfig().apiUrl;
    this.professorUrl = this.config+'/professor'
  }

  getProfessors(): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.professorUrl)
  }

  getLastInsertedProfessor(): Observable<Professor>{
    return this.http.get<Professor>(this.professorUrl+'/finalInserted')
  }

  addProfessor(professor: Professor): Observable<Professor>{
    return this.http.post<Professor>(this.professorUrl, professor)
  }

  deleteProfessor(id: number){
    const prof = new Professor();
    prof.id = id;
    return this.http.request('delete', this.professorUrl+'/multiple', { body: prof})
  }

  updateProfessor(profesor: Professor){
    return this.http.patch(this.professorUrl+'/'+profesor.id, profesor)
  }

  deleteProfessors(professors: Professor[]){
    return this.http.request('delete', this.professorUrl+'/multiple', { body: professors })
  }
}
