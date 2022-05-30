
export interface UserState {
  isSpinner?: null | undefined | boolean;
  users?: null | undefined | any[];
  error?: null | undefined | string;
  totalCount?: null | undefined | number;
}

export const initialUserState: UserState = {
  isSpinner: false,
  users: [],
  error: null,
  totalCount: null,
};

export interface MainUsersState {
  UserState: UserState;

}

export const initialMainUsersState: MainUsersState = {
  UserState: initialUserState,
};





