import { AppState } from "../../interfaces";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { mainSettingState} from "./setting.state";


const selectSettingState = createFeatureSelector<AppState, mainSettingState>(
  "settingState"
);

export const SettingSelector = createSelector(
    selectSettingState,
  (state) => state?.settings 
);