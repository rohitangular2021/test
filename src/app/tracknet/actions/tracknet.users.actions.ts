import { Action } from "@ngrx/store";

export enum UsersActionTypes {
  FETCH_USERS_ACTION = "[Users] fetchUsersAction",
  FETCH_USERS_SUCCESS_ACTION = "[Users] fetchUsersSuccessAction",
  FETCH_USERS_FAILED_ACTION = "[Users] fetchUsersFailedAction",
  LOADMORE_USERS_ACTION = "[Users] loadMoreUsersAction",
  LOADMORE_USERS_SUCCESS_ACTION = "[Users] loadMoreUsersSuccessAction",
  LOADMORE_USERS_FAILED_ACTION = "[Users] loadMoreUsersFailedAction",
}

export class FetchUsersAction implements Action {
  readonly type = UsersActionTypes.FETCH_USERS_ACTION;
  constructor(public payload?: any) {}
}

export class FetchUsersSuccessAction implements Action {
  readonly type = UsersActionTypes.FETCH_USERS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class FetchUsersFailedAction implements Action {
  readonly type = UsersActionTypes.FETCH_USERS_FAILED_ACTION;
  constructor(public payload: any) {}
}

export class LoadMoreActionUser implements Action {
  readonly type = UsersActionTypes.LOADMORE_USERS_ACTION;
  constructor(public payload:any) {}
}

export class LoadMoreUsersSuccessAction implements Action {
  readonly type = UsersActionTypes.LOADMORE_USERS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}

export class LoadMoreUsersFailedAction implements Action {
  readonly type = UsersActionTypes.LOADMORE_USERS_FAILED_ACTION;
  constructor(public payload: any) {}
}

export type UsersActions =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersFailedAction
  | LoadMoreActionUser
  | LoadMoreUsersFailedAction
  | LoadMoreUsersSuccessAction