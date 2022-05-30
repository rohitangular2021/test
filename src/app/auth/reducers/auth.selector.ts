import { AppState } from "../../interfaces";
import { AuthState } from "./auth.state";
import { createSelector } from "@ngrx/store";

function getAppState(state: AppState): AuthState {
  return state.auth;
}

// ******************** Individual selectors ***************************
const fetchAuthState = function(state: AuthState): AuthState {
  return state;
};

// *************************** PUBLIC API's ****************************
export const getAuthState = createSelector(getAppState, fetchAuthState);
