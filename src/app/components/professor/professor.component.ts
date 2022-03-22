import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor.model';

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

  constructor() { }

  ngOnInit(): void {
    
  }

  openNew(){

  }
  deleteSelectedProducts(){}
  editProfessor(professor: Professor){}
  deleteProfessor(professor: Professor){}
  hideDialog(){}
  saveProfessor(){}

}
