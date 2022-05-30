import {
    initialStudentsState,
    StudentsState,
} from "./students-state";
import {
  StudentsActionTypes,
  StudentsActions,
} from "../actions/tracknet.students.actions"

export function studentsReducer(
  state = initialStudentsState,
  action: StudentsActions
): StudentsState {
  switch (action.type) {
    case StudentsActionTypes.FETCH_STUDENTS_ACTION: {
      return {
        ...state,
        isSpinner: true,
        error: null,
      };
    }

    case StudentsActionTypes.FETCH_STUDENTS_SUCCESS_ACTION: {
      return {
        ...state,
        isSpinner: false,
        error: null,
        students: action.payload,
      };
    }

    case StudentsActionTypes.FETCH_STUDENTS_FAILED_ACTION: {
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


