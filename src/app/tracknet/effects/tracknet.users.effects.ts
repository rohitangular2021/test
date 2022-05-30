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
  UsersActionTypes,
  UsersActions,
  FetchUsersSuccessAction,
  FetchUsersFailedAction,
  
} from "../actions/tracknet.users.actions";
import { TracketService } from "../services/tracket.service";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private service:TracketService
  ) {}

  
  fetchUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActionTypes.FETCH_USERS_ACTION),
      switchMap((action: UsersActions) =>
        this.service.getUsers().pipe(
          map((res) => new FetchUsersSuccessAction(res)),
          catchError((_) =>
            of(new FetchUsersFailedAction("Network Error,Try again."))
          )
        )
      )
    )
  );

 

}
