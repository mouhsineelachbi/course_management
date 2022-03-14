import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  userInfos = new FormData();
  // registredUser: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.minLength(5)],
      password: [
        '',
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ],
    });
  }

  ngOnInit(): void {}

  signup(): void {

    const registredUser= new User();
    registredUser.email     = this.registerForm.get('email')?.value
    registredUser.username  = this.registerForm.get('username')?.value
    registredUser.password  = this.registerForm.get('password')?.value
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');

    this.httpClient
      .post('http://localhost:3000/users', registredUser, {headers: headers})
      .subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
      );
  }
}
