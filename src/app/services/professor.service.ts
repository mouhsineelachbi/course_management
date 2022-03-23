import { Professor } from './../models/professor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  config: AppConfig;
  professorUrl: string

  constructor(private http: HttpClient, private config: AppConfigService) { 
    this.config = config.getConfig().apiUrl;
    this.professorUrl = this.config+'/professor'
  }

  getProfessors(){
    return this.http.get(this.professorUrl).toPromise()
  }

  addProfessor(professor: Professor){
    return this.http.post(this.professorUrl, professor).toPromise();
  }

  deleteProfesssor(id: number){
    const prof = new Professor();
    prof.id = id;
    return this.httpClient.request('delete', this.professorUrl+'/multiple', { body: prof}).toPromise().then(res => console.log("deleted"));
  }

  updateProfessor(profesor: Professor){
    return this.httpClient.patch(this.professorUrl+'/'+profesor.id, profesor).toPromise().then(res => console.log('updated'));
  }

  deleteProfessor(professors: Professor[]){
    return this.httpClient.request('delete', this.professorUrl+'/multiple', { body: professors }).toPromise().then(res => console.log("deleted"));
  }
}
