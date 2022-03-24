import { Professor } from './professor.model';

export interface CourseInterface {
    id?: number;
    name: string;
    duration: number;
    language: string;
    professor: Professor;
}

export class Course implements CourseInterface {
    id?: number;
    name!: string;
    duration!: number;
    language!: string;
    professor: Professor;
}