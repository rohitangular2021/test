import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { AuthLoginService } from "../services/auth.service";
import {
  AuthActionTypes,
  SendOtpForSignupSuccessAction,
  SendOtpForSignupFailedAction,
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthLoginService,
    private _store: Store<any>
  ) {}

  sendOtpForSignup$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActionTypes.SEND_OTP_FOR_SIGNUP_ACTION),
      switchMap((action: any) =>
        this.authService.verfiyOtpForSignup(action.payload).pipe(
          map((res: any) =>
            res!.status === 200
              ? new SendOtpForSignupSuccessAction(res!.data)
              : new SendOtpForSignupFailedAction(
                  res!.error
                    ? String(res!.error)
                    : "Enable to send otp right now !"
                )
          ),
          catchError((_) =>
            of(new SendOtpForSignupFailedAction("Unexpected error occurred"))
          )
        )
      )
    )
  );
}
