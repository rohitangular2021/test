import { AppState } from "./interfaces";
import { createSelector } from "@ngrx/store";

function fetchAppState(state: AppState): AppState {
  return state;
}

// ******************** Individual selectors ***************************
// const fetchAuthState = function(state: App): AuthState {
//   return state;
// };

// *************************** PUBLIC API's ****************************
export const getAppState = createSelector(fetchAppState, fetchAppState);
