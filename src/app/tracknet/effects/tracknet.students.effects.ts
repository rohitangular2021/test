import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  concatMap,
  pluck,
  tap,
} from "rxjs/operators";
import { of } from "rxjs";
import {
  StudentsActionTypes,
  StudentsActions,
  FetchStudentsFailedAction,
  FetchStudentsSuccessAction
  
} from "../actions/tracknet.students.actions";
import { TracketService } from "../services/tracket.service";

@Injectable()
export class StudentsEffects {
  constructor(
    private actions$: Actions,
    private service:TracketService
  ) {}

  
  fetchStudents$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActionTypes.FETCH_STUDENTS_ACTION),
      switchMap((action: StudentsActions) =>
        this.service.getStudents().pipe(
          map((res) =>
           new FetchStudentsSuccessAction(res)),
          catchError((_) =>
            of(new FetchStudentsFailedAction("Network Error,Try again."))
          )
        )
      )
    )
  );

 

}
