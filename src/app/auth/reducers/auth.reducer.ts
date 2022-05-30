import { AuthActions, AuthActionTypes } from "../actions/auth.actions";
import { AuthState, initialState } from "./auth.state";

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SEND_OTP_FOR_SIGNUP_ACTION: {
      return {
        ...state,
        isSpinner: true,
        message: null,
        error: null
      };
    }

    case AuthActionTypes.SEND_OTP_FOR_SIGNUP_SUCCESS_ACTION: {
      return {
        ...state,
        isSpinner: false,
        message: "Send Otp Successfully",
        error: null
      };
    }

    case AuthActionTypes.SEND_OTP_FOR_SIGNUP_FAILED_ACTION: {
      return {
        ...state,
        isSpinner: false,
        message: null,
        error: action.payload
      };
    }

    case AuthActionTypes.RESET_ERROR_MSG: {
      return {
        ...state,
        error: null,
        message: null
      };
    }

    default:
      return state;
  }
}
