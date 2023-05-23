import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, timer } from "rxjs";
import { Action } from "@ngrx/store";
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  concatMap,
  pluck,
  tap,
  retryWhen,
  delayWhen,
  scan,
} from "rxjs/operators";
import { of } from "rxjs";
import {
  UsersActionTypes,
  UsersActions,
  FetchUsersSuccessAction,
  FetchUsersFailedAction,
  LoadMoreUsersFailedAction,
  LoadMoreUsersSuccessAction,

} from "../actions/tracknet.users.actions";
import { TracketService } from "../services/tracket.service";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private service: TracketService
  ) { }


  fetchUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActionTypes.FETCH_USERS_ACTION),
      switchMap((action: UsersActions) =>
        this.service.getUsers().pipe(
          retryWhen(err => err.pipe(
            scan(retryCount => {
              if (retryCount > 5) throw err
              else {
                retryCount++
                return retryCount
              }
            }, 0),
            delayWhen(() => timer(5000))
          )),

          map((res: any) => {
            return new FetchUsersSuccessAction(res)
          }),
          catchError((_) =>
            of(new FetchUsersFailedAction("Network Error,Try again."))
          )
        )
      )
    )
  );

  loadMoreUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActionTypes.LOADMORE_USERS_ACTION),
      switchMap((action: UsersActions) =>
        this.service.getUsers(action.payload)
          .pipe(
            map((res) => new LoadMoreUsersSuccessAction(res)),
            catchError((_) =>
              of(new LoadMoreUsersFailedAction("Network Error,Try again."))
            )
          )
      )
    )
  );



}
