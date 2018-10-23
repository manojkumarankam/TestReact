import { TaskConstants } from "../constants/task-constants";

const getTasksAction = () => ({
  type: TaskConstants.Get_Request
});

const editTasksAction = id => ({
  type: TaskConstants.Edit_Request,
  id: id
});

const createTasksAction = title => ({
  type: TaskConstants.Create_Request,
  title: title
});

const updateTasksAction = model => ({
  type: TaskConstants.Update_Request,
  model: model
});

const deleteTasksAction = id => ({
  type: TaskConstants.Delete_Request,
  id: id
});

const completeTasksAction = id => ({
  type: TaskConstants.Complete_Request,
  id: id
});

export {
  getTasksAction,
  editTasksAction,
  createTasksAction,
  updateTasksAction,
  deleteTasksAction,
  completeTasksAction
};