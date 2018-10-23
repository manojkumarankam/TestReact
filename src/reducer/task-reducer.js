import { TaskConstants } from "../constants/task-constants";

export function TaskReducer(state = {}, action) {
  debugger;
  switch (action.type) {
    case TaskConstants.Get_Request:
      return {
        ...state,
        loading: true
      };
    case TaskConstants.Get_Success:
      return {
        ...state,
        loading: false,
        tasks: action.result
      };
    case TaskConstants.Edit_Request:
      return {
        ...state,
        loading: true
      };
    case TaskConstants.Edit_Success:
      debugger;
      return {
        ...state,
        task: action.result,
        taskInitial: action.result
      };

    case TaskConstants.Task_Change:
      debugger;
      return {
        ...state,
        taskInitial: action.result
      };
    default:
      return state;
  }
}


