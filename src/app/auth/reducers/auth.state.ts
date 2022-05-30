export interface AuthState {
  isSpinner?: null | undefined | boolean;
  error?: null | undefined | boolean;
  message?: null | undefined | string;
}

export const initialState: AuthState = {
  isSpinner: false,
  error: null,
  message: null
};
