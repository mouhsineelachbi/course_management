export interface ProfessorInterface {
    id: number;
    first_name: string;
    last_name: string;
    grade: string;
    age: number;    
}


export class Professor implements ProfessorInterface {
    id!: number;
    first_name!: string;
    last_name!: string;
    grade!: string;
    age!: number;  
}
