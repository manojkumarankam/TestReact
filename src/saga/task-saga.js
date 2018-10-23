import { put, all, takeLatest } from "redux-saga/effects";
import {
  getAllTasks,
  createTask,
  deleteTask,
  completeTask,
  updateTask
} from "../services/task-services";
import { TaskConstants } from "../constants/task-constants";

function* getTasks() {
  const result = yield getAllTasks().then(res => res);
  yield put({ type: TaskConstants.Get_Success, result: result });
}

function* getTasksWatcher() {
  yield takeLatest(TaskConstants.Get_Request, getTasks);
}

function* editTasks(model) {
  const result = yield getAllTasks().then(res => res);
  let sinGleRec = result.filter(function(item) {
    return model.id === parseInt(item.id, 10);
  });

  yield put({ type: TaskConstants.Edit_Success, result: sinGleRec[0] });
}

function* editTasksWatcher() {
  yield takeLatest(TaskConstants.Edit_Request, editTasks);
}

function* createTasks(model) {
  let req = { title: model.title };
  const result = yield createTask(req).then(res => res);
  yield put({ type: TaskConstants.Get_Success, result: result });
}

function* createTasksWatcher() {
  yield takeLatest(TaskConstants.Create_Request, createTasks);
}

function* deleteTasks(model) {
  const result = yield deleteTask(model.id).then(res => res);
  yield put({ type: TaskConstants.Get_Success, result: result });
}

function* completeTasks(model) {
  const result = yield completeTask(model.id).then(res => res);
  yield put({ type: TaskConstants.Get_Success, result: result });
}

function* deleteTasksWatcher() {
  yield takeLatest(TaskConstants.Delete_Request, deleteTasks);
}

function* completeTasksWatcher() {
  yield takeLatest(TaskConstants.Complete_Request, completeTasks);
}

function* updateTasks(model) {
  const result = yield updateTask(model.model, model.model.id).then(res => res);
  yield put({ type: TaskConstants.Get_Success, result: result });
}

function* updateTasksWatcher() {
  yield takeLatest(TaskConstants.Update_Request, updateTasks);
}

export default function* rootSaga() {
  yield all([
    getTasksWatcher(),
    editTasksWatcher(),
    createTasksWatcher(),
    completeTasksWatcher(),
    deleteTasksWatcher(),
    updateTasksWatcher()
  ]);
}
