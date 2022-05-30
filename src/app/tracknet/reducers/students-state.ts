export interface StudentsState {
    isSpinner?: null | undefined | boolean;
    students?: null | undefined | any[];
    error?: null | undefined | string;
    totalCount?: null | undefined | number;
  }
  
  export const initialStudentsState: StudentsState = {
    isSpinner: false,
    students: [],
    error: null,
    totalCount: null,
  };
  
  export interface StudentState {
   name:string | null | undefined | boolean;
   fatherName:string | null | undefined | boolean;
   motherName:string | null | undefined | boolean;
   email:string | null | undefined | boolean;
   phone:number | null | undefined | boolean,
   className:string | null | undefined | boolean;
   subjects:string | null | undefined | boolean;
   classTeacher:string | null | undefined | boolean;
   address:string | null | undefined | boolean;
   photo:string | null | undefined | boolean;
  }
  
  export const initialStudentState: StudentState = {
    name:null,
    fatherName:null,
    motherName:null,
    email:null,
    phone:null,
    className:null,
    subjects:null,
    classTeacher:null,
    address:null,
    photo:null
  };