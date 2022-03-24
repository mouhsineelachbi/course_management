import { Course, CourseInterface } from './../models/course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  config: string;
  courseUrl: string

  constructor(private http: HttpClient, private configs: AppConfigService) { 
    this.config = configs.getConfig().apiUrl;
    this.courseUrl = this.config+'/course'
  }

  getCourses(): Observable<Course>{
    return this.http.get<Course>(this.courseUrl);
  }

  getLastInsertedCourse(): Observable<Course>{
    return this.http.get<Course>(this.courseUrl+'/finalInserted')
  }

  addCourse(course: CourseInterface): Observable<Course>{
    return this.http.post<Course>(this.courseUrl, course);
  }

  deleteCourse(id: number){
    const course = new Course
    course.id = id;
    return this.http.request('delete', this.courseUrl+'/multiple', {body: course});
  }

  updateCourse(course: CourseInterface): Observable<CourseInterface>{
    return this.http.patch<Course>(this.courseUrl+'/'+course.id, course)
  }

  deleteCourses(courses: CourseInterface[]){
    return this.http.request('delete', this.courseUrl+'/multiple', {body: courses})
  }



  
}
