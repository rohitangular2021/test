import {
    initialMainDashboardState,
    MainDashboardState,
} from "./dashboard-state";
import {
  dashboardActionTypes,
  DashboardActions,
} from "../actions/tracknet.dahboard.actions"

export function dashboardReducer(
  state = initialMainDashboardState,
  action: DashboardActions
): MainDashboardState {
  switch (action.type) {
    case dashboardActionTypes.FETCH_DASHBOARD_ACTION: {
      return {
        ...state,
        isSpinner: true,
        error: null,
      };
    }

    case dashboardActionTypes.FETCH_DASHBOARD_SUCCESS_ACTION: { 
      return {
        ...state,
        isSpinner: false,
        error: null,
        dashboard: action.payload,
      };
    }

    case dashboardActionTypes.FETCH_DASHBOARD_FAILED_ACTION: {
      return {
        ...state,
        isSpinner: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}


