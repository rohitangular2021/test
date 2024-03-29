import { AuthState } from "./auth/reducers/auth.state";
import { MainDashboardState } from "./tracknet/reducers/dashboard-state";
import { mainSettingState } from "./tracknet/reducers/setting.state";
import { StudentsState } from "./tracknet/reducers/students-state";
import { MainUsersState } from "./tracknet/reducers/users-state";

export interface AppState {
  auth: AuthState;
  usersState: MainUsersState;
  studentsState: StudentsState;
  dashboardState:MainDashboardState;
  settingState:mainSettingState
}


export const ResponseState = {
  progress: false,
  success: false,
  failed: false,
  data: null,
  error: null,
};

export const allModule = {
};
