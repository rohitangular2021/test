import { SettingsActions, SettingsActionTypes } from "../actions/tracknet.settings.actions";
import { initialmainSettingState, mainSettingState, SettingState } from "./setting.state";


export function settingReducer(
    state = initialmainSettingState,
    action: SettingsActions
  ): mainSettingState {
    switch (action.type) {
      case SettingsActionTypes.FETCH_SETTINGS_ACTION: {
        return {
          ...state,
          isSpinner: true,
          error: null,
        };
      }
  
      case SettingsActionTypes.FETCH_SETTINGS_SUCCESS_ACTION: {  
        return {
          ...state, 
          isSpinner: false,
          error: null,
          settings:action.payload.data
        };
        
      }
  
      case SettingsActionTypes.FETCH_SETTINGS_FAILED_ACTION: {
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