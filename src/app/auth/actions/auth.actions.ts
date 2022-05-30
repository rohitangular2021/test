import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  SEND_OTP_FOR_SIGNUP_ACTION = "[auth] sendOtpForSignupAction",
  SEND_OTP_FOR_SIGNUP_FAILED_ACTION = "[auth] sendOtpForSignupFailedAction",
  SEND_OTP_FOR_SIGNUP_SUCCESS_ACTION = "[auth] sendOtpForSignupSuccessAction",

  RESET_ERROR_MSG = "[auth] resetErrorMsgAction"
}

export class SendOtpForSignupAction implements Action {
  readonly type = AuthActionTypes.SEND_OTP_FOR_SIGNUP_ACTION;
  constructor(public payload: any) {}
}

export class SendOtpForSignupSuccessAction implements Action {
  readonly type = AuthActionTypes.SEND_OTP_FOR_SIGNUP_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class SendOtpForSignupFailedAction implements Action {
  readonly type = AuthActionTypes.SEND_OTP_FOR_SIGNUP_FAILED_ACTION;
  constructor(public payload: any) {}
}

export class ResetErrorMsgAction implements Action {
  readonly type = AuthActionTypes.RESET_ERROR_MSG;
  constructor(public payload: any) {}
}

export type AuthActions = SendOtpForSignupAction | SendOtpForSignupSuccessAction | SendOtpForSignupFailedAction | ResetErrorMsgAction;
