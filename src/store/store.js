import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../saga/task-saga";
import { TaskReducer } from "../reducer/task-reducer";

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(TaskReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
