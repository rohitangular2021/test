import { Action } from "@ngrx/store";

export enum dashboardActionTypes {
  FETCH_DASHBOARD_ACTION = "[Dashboard] fetchDashboardAction",
  FETCH_DASHBOARD_SUCCESS_ACTION = "[Dashboard] fetchDashboardSuccessAction",
  FETCH_DASHBOARD_FAILED_ACTION = "[Dashboard] fetchDashboardFailedAction",

}

export class FetchDashboardAction implements Action {
  readonly type = dashboardActionTypes.FETCH_DASHBOARD_ACTION;
  constructor() {}
}

export class FetchDashboardSuccessAction implements Action {
  readonly type = dashboardActionTypes.FETCH_DASHBOARD_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class FetchDashboardFailedAction implements Action {
  readonly type = dashboardActionTypes.FETCH_DASHBOARD_FAILED_ACTION;
  constructor(public payload: any) {}
}


export type DashboardActions =
  | FetchDashboardAction
  | FetchDashboardSuccessAction
  | FetchDashboardFailedAction 