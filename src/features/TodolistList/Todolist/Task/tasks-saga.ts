import {call, put, takeEvery} from 'redux-saga/effects';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {AxiosResponse} from 'axios';
import {GetTasksResponseType, ResponseType, todolistsAPI} from '../../../../api/todolists-api';
import {removeTaskAC, setTasksAC} from './tasks-reducer';

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasksSagaAction>): Generator<any, void, any> {
    yield put(setAppStatusAC('loading'));
    const response: AxiosResponse<GetTasksResponseType> = yield call(todolistsAPI.getTasks, action.todolistId);
    yield put(setTasksAC(action.todolistId, response.data.items));
    yield put(setAppStatusAC('succeeded'));
}

export const fetchTasksSagaAction = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId} as const);

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTaskSagaAction>): Generator<any, void, any> {
    const response: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId);
    if (response.data.resultCode === 0) yield put(removeTaskAC(action.todolistId, action.taskId));
}

export const removeTaskSagaAction = (todolistId: string, taskId: string) => ({
    type: 'TASKS/REMOVE-TASK',
    todolistId,
    taskId
} as const);

export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga);
    yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga);
}