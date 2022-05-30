import { AppState } from "../../interfaces";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { StudentsState} from "./students-state";

const selectStudentsState = createFeatureSelector<AppState, StudentsState>(
  "studentsState"
);
export const StudentsSelector = createSelector(
    selectStudentsState,
  (state) => state.students
);
