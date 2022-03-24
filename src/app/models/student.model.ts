import { Course } from "./course.model";

export class Student {
    id?: number;

    first_name?: string;
    
    last_name?: string;
    
    age?: number;
    
    cne?: string;

    courses?: Course[]
}