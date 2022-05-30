import { AppState } from "../../interfaces";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { MainUsersState, UserState} from "./users-state";

const selectUsersState = createFeatureSelector<AppState, UserState>(
  "usersState"
);
export const UsersSelector = createSelector(
  selectUsersState,
  (state) => state.users
);



