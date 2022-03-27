import { Course } from './course.model';
export interface ProfessorInterface {
    id: number;
    first_name: string;
    last_name: string;
    grade: string;
    age: number;    
    courses: Course[];
}


export class Professor implements ProfessorInterface {
    id!: number;
    first_name!: string;
    last_name!: string;
    grade!: string;
    age!: number;  
    courses!: Course[]
}
