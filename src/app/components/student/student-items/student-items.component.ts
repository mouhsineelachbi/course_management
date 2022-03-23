import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-student-items',
  templateUrl: './student-items.component.html',
  styleUrls: ['./student-items.component.css'],
})
export class StudentItemsComponent implements OnInit {
  students!: Student[];
  selectedStudents!: Student[];
  studentDialog!: boolean;
  student!: Student;
  submitted!: boolean;
  statuses!: any[];
  ageArray: any;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.studentService.getStudents().then((data) => {
      this.students = data;
    });
    this.fillAgeArray();
  }

  fillAgeArray() {
    this.ageArray = Array.from({ length: 20 }, (x, i) => i).filter(
      (n) => n > 10
    );
    this.ageArray = this.ageArray.map((el: number) => {
      return { label: el, value: el };
    });
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Message',
      detail: 'Student added successfuly',
    });
  }

  addMultiple() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService',
      },
      {
        severity: 'info',
        summary: 'Info Message',
        detail: 'Via MessageService',
      },
    ]);
  }

  clear() {
    this.messageService.clear();
  }

  openNew() {
    this.student = {};
    this.submitted = false;
    this.studentDialog = true;
  }
  deleteSelectedStudents() {
    console.log(this.selectedStudents);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.students = this.students.filter(
          (val) => !this.selectedStudents.includes(val)
        );
        this.studentService.deleteStudents(this.selectedStudents);
        this.selectedStudents = [];
        this.student = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Students Deleted',
          life: 3000,
        });
      },
    });
  }
  editStudent(student: Student) {
    this.student = { ...student };
    this.studentDialog = true;
  }
  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student.first_name + ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.students = this.students.filter((stud) => stud.id != student.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Deleted',
          life: 3000,
        });
        let student_to_delete = [];
        student_to_delete.push({ id: student.id });
        student &&
          student.id &&
          this.studentService.deleteStudents(student_to_delete);
        this.student = {};
      },
    });
  }
  hideDialog() {
    this.studentDialog = false;
  }
  saveStudent() {
    if (this.student.id) {
      this.students[this.findIndexById(this.student.id)] = this.student;
      this.studentService.updateStudent(this.student);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Student Updated',
        life: 3000,
      });
    } else {
      this.studentService
        .addStudent(this.student)
        .then((data) => {
          this.studentService.getLastStudent().subscribe((data) => {
            this.students.push(data);
          });
        });
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Student Created',
        life: 3000,
      });
    }
    this.student = {};
    this.studentDialog = false;
  }
  loadLazy(event: Event) {}
  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
