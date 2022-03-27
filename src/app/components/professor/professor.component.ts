import { CourseService } from './../../services/course.service';
import { ProfessorInterface } from './../../models/professor.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Professor } from 'src/app/models/professor.model';
import { AppConfigService } from 'src/app/services/app.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
})
export class ProfessorComponent implements OnInit {
  selectedProfessors: any = null;
  professors!: any;
  professorDialog: boolean = false;
  professor: Professor;
  submitted: boolean = false;
  courses: any

  constructor(
    private http: HttpClient,
    private professorService: ProfessorService,
    private courseService: CourseService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.professorService.getProfessors().subscribe(data => this.professors = data)
    this.courseService.getCourses().subscribe((data) => this.courses = data)
  }

  openNew() {
    this.professor = new Professor();
    this.submitted = false;
    this.professorDialog = true;
  }
  deleteSelectedProfessors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.professors = this.professors.filter(
          (val: Professor) => !this.selectedProfessors.includes(val)
        );
        this.professorService.deleteProfessors(this.selectedProfessors).subscribe(res => console.log("deleted"));
        this.selectedProfessors = [];
        this.professor = new Professor();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Students Deleted',
          life: 3000,
        });
      },
    });
  }
  editProfessor(professor: Professor) {
    this.professorDialog = true;
    this.professor = professor;
  }
  deleteProfessor(professor: Professor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + professor.first_name + ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.professors = this.professors.filter((prof: Professor) => prof.id != professor.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Professor Deleted',
          life: 3000,
        });
        let professor_to_delete: ProfessorInterface[] = [];
        professor_to_delete.push({ ...professor, id: professor.id, });
        professor &&
          professor.id &&
          this.professorService.deleteProfessors(professor_to_delete).subscribe();
        this.professor = new Professor();
      },
    });
  }
  hideDialog() {
    this.professorDialog = false;
    this.professor = new Professor()
  }
  saveProfessor() {
    if (this.professor.id) {
      this.professors[this.findIndexById(this.professor.id)] = this.professor;
      this.professorService.updateProfessor(this.professor).subscribe();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Professor Updated',
        life: 3000,
      });
    } else {
      this.professorService
        .addProfessor(this.professor)
        .subscribe((data) => {this.professorService.getLastInsertedProfessor().subscribe((data) => {this.professors.push(data);});});
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Professor Created',
        life: 3000,
      });
    }
    this.professor = new Professor;
    this.professorDialog = false;
  
  }

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.professors.length; i++) {
      if (this.professors[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
