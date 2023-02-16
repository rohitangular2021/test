import { Action } from "@ngrx/store";

export enum SettingsActionTypes {
    FETCH_SETTINGS_ACTION = "[Settings] fetchSettingsAction",
    FETCH_SETTINGS_SUCCESS_ACTION = "[Settings] fetchSettingsSuccessAction",
    FETCH_SETTINGS_FAILED_ACTION = "[Settings] fetchSettingsFailedAction",
}

export class FetchSettingsAction implements Action {
  readonly type = SettingsActionTypes.FETCH_SETTINGS_ACTION;
  constructor() {}
}

export class FetchSettingsSuccessAction implements Action {
  readonly type = SettingsActionTypes.FETCH_SETTINGS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class FetchSettingsFailedAction implements Action {
  readonly type = SettingsActionTypes.FETCH_SETTINGS_FAILED_ACTION;
  constructor(public payload: any) {}
}

export type SettingsActions =
  | FetchSettingsAction
  | FetchSettingsSuccessAction
  | FetchSettingsFailedAction