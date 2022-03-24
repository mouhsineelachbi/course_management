import { ProfessorService } from 'src/app/services/professor.service';
import { CourseService } from './../../services/course.service';
import { Course, CourseInterface } from './../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Professor } from 'src/app/models/professor.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  selectedCourses!: Course[];
  courses!: any;
  course!: CourseInterface;
  courseDialog: boolean;
  submitted: boolean;
  professors!: Professor[];

  constructor(
    private courseService: CourseService,
    private professorService: ProfessorService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) {
    this.professorService.getProfessors().subscribe((professors: Professor[]) => this.professors = professors)
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  openNew() {
    this.course = new Course();
    this.courseDialog = true;
    this.submitted = false;
  }

  deleteSelectedCourses() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService
          .deleteCourses(this.selectedCourses)
          .subscribe((data) => {
            this.courses = this.courses.filter(
              (val: Course) => !this.selectedCourses.includes(val)
            );
            this.course = new Course();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Courses Deleted',
              life: 3000,
            });
          });
      },
    });
  }

  editCourse(course: CourseInterface) {
    this.courseDialog = true;
    this.course = course;
  }

  deleteCourse(course: CourseInterface) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.name + ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let course_to_delete: CourseInterface[] = [];
        course_to_delete.push(course);
        this.courseService.deleteCourses(course_to_delete).subscribe((data) => {
          this.courses = this.courses.filter(
            (course: CourseInterface) => course != this.course
          );
          this.course = new Course();
        });
      },
    });
  }

  hideDialog() {
    this.courseDialog = false;
  }
  saveCourse() {
    if (this.course.id) {
      this.courses[this.findIndexById(this.course.id)] = this.course;
      this.courseService.updateCourse(this.course);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Course Updated',
        life: 3000,
      });
    } else {
      this.courseService
        .addCourse(this.course).subscribe((data: CourseInterface) => {
          this.courseService.getLastInsertedCourse().subscribe((data) => {
            this.courses.push(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'course Created',
              life: 3000,
            });
          });
        })
    }
    this.course = new Course();
    this.courseDialog = false;
  }

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }
}