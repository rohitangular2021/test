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
import { TracketService } from "../services/tracket.service";
import { FetchSettingsFailedAction, FetchSettingsSuccessAction, SettingsActions, SettingsActionTypes } from "../actions/tracknet.settings.actions";

@Injectable()
export class SettingsEffects {
    constructor(
        private actions$: Actions,
        private service: TracketService
    ) { }


    fetchSettings$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(SettingsActionTypes.FETCH_SETTINGS_ACTION),
            switchMap((action: SettingsActions) =>
                this.service.getSettings().pipe(
                    map((res) => new FetchSettingsSuccessAction(res)),
                    catchError((_) =>
                        of(new FetchSettingsFailedAction("Network Error,Try again."))
                    )
                )
            )
        )
    );



}
