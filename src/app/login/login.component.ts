import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  Login(): any {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    let options = {
      headers: httpHeaders,
    };
    this.http
      .post('http://localhost:3000/auth/login', this.user, options).subscribe(data => console.log(data), error => console.log(error));
  }
}
