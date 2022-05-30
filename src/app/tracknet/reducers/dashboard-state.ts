export interface dashDataState {
  active_users:number | null | undefined | boolean;
  inActive_users:number | null | undefined | boolean;
  active_students:number | null | undefined | boolean;
  inActive_students:number | null | undefined | boolean;
  students_assignment_pending:number | null | undefined | boolean,
  students_acceptence_pending:number | null | undefined | boolean;
 }
 
 export const initialdashDataState: dashDataState = {
   active_users:0,
   inActive_users:0,
   active_students:0,
   inActive_students:0,
   students_assignment_pending:0,
   students_acceptence_pending:0,
 };

export interface MainDashboardState {
  isSpinner?: null | undefined | boolean;
  dashboard?: null | undefined | any;
  error?: null | undefined | string;
  totalCount?: null | undefined | number;
}

export const initialMainDashboardState: MainDashboardState = {
  isSpinner: false,
  dashboard: initialdashDataState,
  error: null,
  totalCount: null,
};


 