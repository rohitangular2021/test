import { environment } from "./../environments/environment";

import { ActionReducer, MetaReducer } from "@ngrx/store";
import { AppState as State } from "./interfaces";
import * as fromAuth from "../app/auth/reducers/auth.reducer";
import * as fromUsers from "./tracknet/reducers/users.reducer";
import * as fromStudents from "./tracknet/reducers/students.reducer";
import * as fromDashboard from "./tracknet/reducers/dashboard.reducer";
import * as fromSettings from "./tracknet/reducers/settings.reducer";

export const reducers: any = {
  auth: fromAuth.reducer,
  usersState:fromUsers.usersReducer,
  studentsState:fromStudents.studentsReducer,
  dashboardState:fromDashboard.dashboardReducer,
  settingState:fromSettings.settingReducer
};

/**
 * logger reducer
 * @param reducer ofType ActionReducer<>
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function(state: State, action: any): State {
    const newState = reducer(state, action);
    // console.log("action", action);
    // console.log("oldState", state);
    // console.log("newState", newState);
    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [
 logger
] : [];
