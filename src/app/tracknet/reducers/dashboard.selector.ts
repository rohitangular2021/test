import { AppState } from "../../interfaces";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { MainDashboardState} from "./dashboard-state";

const selectDashboardState = createFeatureSelector<AppState, MainDashboardState>(
  "dashboardState"
);
export const DashboardSelector = createSelector(
    selectDashboardState,
  (state) => state.dashboard
);