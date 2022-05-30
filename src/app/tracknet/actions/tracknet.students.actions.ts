import { Action } from "@ngrx/store";

export enum StudentsActionTypes {
  FETCH_STUDENTS_ACTION = "[Students] fetchStudentsAction",
  FETCH_STUDENTS_SUCCESS_ACTION = "[Students] fetchStudentsSuccessAction",
  FETCH_STUDENTS_FAILED_ACTION = "[Students] fetchStudentsFailedAction",

}

export class FetchStudentsAction implements Action {
  readonly type = StudentsActionTypes.FETCH_STUDENTS_ACTION;
  constructor() {}
}

export class FetchStudentsSuccessAction implements Action {
  readonly type = StudentsActionTypes.FETCH_STUDENTS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class FetchStudentsFailedAction implements Action {
  readonly type = StudentsActionTypes.FETCH_STUDENTS_FAILED_ACTION;
  constructor(public payload: any) {}
}

export type StudentsActions =
  | FetchStudentsAction
  | FetchStudentsSuccessAction
  | FetchStudentsFailedAction