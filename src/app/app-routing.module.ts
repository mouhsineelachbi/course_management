import { CourseComponent } from './components/course/course.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { StudentItemsComponent } from './components/student/student-items/student-items.component';
import { ProfessorComponent } from './components/professor/professor.component';

const routes: Routes = [

  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'students',
        component: StudentItemsComponent,
        outlet: "management"
      },
      {
        path: 'professors',
        component: ProfessorComponent,
        outlet: 'management'
      },
      {
        path: 'courses',
        component: CourseComponent,
        outlet: 'management'
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
