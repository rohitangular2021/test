
import {
  initialUserState,
  UserState,
} from "./users-state";
import {
  UsersActionTypes,
  UsersActions,
} from "../actions/tracknet.users.actions"

export function usersReducer(
  state = initialUserState,
  action: UsersActions
): UserState {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_ACTION: {
      return {
        ...state,
        isSpinner: true,
        error: null,
      };
    }

    case UsersActionTypes.FETCH_USERS_SUCCESS_ACTION: {
      return {
        ...state,
        isSpinner: false,
        error: null,
        users: action.payload,
      };
    }

    case UsersActionTypes.FETCH_USERS_FAILED_ACTION: {
      return {
        ...state,
        isSpinner: false,
        error: action.payload,
      };
    }

    case UsersActionTypes.LOADMORE_USERS_ACTION: {
      return {
        ...state,
        isSpinner: true,
        error: null,
      };
    }
    case UsersActionTypes.LOADMORE_USERS_SUCCESS_ACTION: {
      let oldData = state.users.data
      let newData =oldData.concat(action.payload.data)
      action.payload.data = newData
      return {
        ...state,
        isSpinner: false,
        error: null,
        users: action.payload
      };
    }
    case UsersActionTypes.LOADMORE_USERS_FAILED_ACTION: {
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


