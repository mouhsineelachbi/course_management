import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor.model';
import { AppConfigService } from 'src/app/services/app.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  selectedProfessors: any = null;
  professors: any = null;
  professorDialog: boolean =  false;
  professor: Professor;
  submitted: boolean = false;
  url: string

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.url = this.config.getConfig().apiUrl;
    console.log(`This is my url ${this.url}`)
   }

  ngOnInit(): void {
    this.http.get(this.url+'/professor').toPromise().then(data => this.professors = data);
    
  }

  openNew(){

  }
  deleteSelectedProducts(){
    
  }
  editProfessor(professor: Professor){}
  deleteProfessor(professor: Professor){}
  hideDialog(){}
  saveProfessor(){}

}
