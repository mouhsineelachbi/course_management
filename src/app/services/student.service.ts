import { Student } from './../models/student.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url: string = 'http://localhost:3000/student';

  constructor(private httpClient: HttpClient) { }

  getStudents() {
    return this.httpClient.get(this.url).toPromise().then(res => <Student[]> res)
  }

  getLastStudent(): Observable<Student>{
    return this.httpClient.get<Student>(this.url+'/finalInserted');
  }

  addStudent(student: Student){
    return this.httpClient.post(this.url, student).toPromise().then(res => console.log(res))
  }

  deleteStudent(id: number) {
    const std = new Student();
    std.id = id;
    return this.httpClient.request('delete', this.url+'/multiple', { body: std}).toPromise().then(res => console.log("deleted"));

  }

  updateStudent(student: Student){
    return this.httpClient.patch(this.url+'/'+student.id, student).toPromise().then(res => console.log('updated'));
  }

  deleteStudents(students: Student[]){
    return this.httpClient.request('delete', this.url+'/multiple', { body: students }).toPromise().then(res => console.log("deleted"));
  }

}
