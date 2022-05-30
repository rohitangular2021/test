import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import {
  switchMap,
  map,
  catchError,
} from "rxjs/operators";
import { of } from "rxjs";
import {
    DashboardActions,
dashboardActionTypes, 
FetchDashboardFailedAction, 
FetchDashboardSuccessAction
} from "../actions/tracknet.dahboard.actions";
import { TracketService } from "../services/tracket.service";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private service:TracketService
  ) {
  }
 
  fetchDashboard$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActionTypes.FETCH_DASHBOARD_ACTION),
      switchMap((action: DashboardActions) =>
        this.service.getDashboard().pipe(
          map((res) =>
           new FetchDashboardSuccessAction(res)),
          catchError((_) =>
            of(new FetchDashboardFailedAction("Network Error,Try again."))
          )
        )
      )
    )
  ); 

}
