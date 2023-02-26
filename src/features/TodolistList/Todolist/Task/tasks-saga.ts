import {call, put, takeEvery} from 'redux-saga/effects';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {AxiosError, AxiosResponse} from 'axios';
import {GetTasksResponseType, ResponseType, TaskType, todolistsAPI} from '../../../../api/todolists-api';
import {addTaskAC, removeTaskAC, setTasksAC} from './tasks-reducer';
import {
    handleServerAppErrorSaga,
    handleServerNetworkError,
    handleServerNetworkErrorSaga
} from '../../../../utilities/error-utilities';

export const fetchTasksSagaAction = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId} as const);
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasksSagaAction>): Generator<any, void, any> {
    yield put(setAppStatusAC('loading'));
    const data: GetTasksResponseType = yield call(todolistsAPI.getTasks, action.todolistId);
    yield put(setTasksAC(action.todolistId, data.items));
    yield put(setAppStatusAC('succeeded'));
}


export const removeTaskSagaAction = (todolistId: string, taskId: string) => ({
    type: 'TASKS/REMOVE-TASK',
    payload: {todolistId, taskId}
} as const);
export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTaskSagaAction>): Generator<any, void, any> {
    const response: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, action.payload.todolistId, action.payload.taskId);
    if (response.data.resultCode === 0) yield put(removeTaskAC(action.payload.todolistId, action.payload.taskId));
}


export const addTaskSagaAction = (todolistId: string, title: string) => ({
    type: 'TASKS/ADD-TASK',
    payload: {todolistId, title}
} as const);
export function* addTaskWorkerSaga(action: ReturnType<typeof addTaskSagaAction>): Generator<any, void, any> {
    yield put(setAppStatusAC('loading'));
    const response: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(todolistsAPI.createTask, action.payload.todolistId, action.payload.title);
    try {
        if (response.data.resultCode === 0) {
            yield put(addTaskAC(response.data.data.item));
            yield put(setAppStatusAC('succeeded'));
        } else yield handleServerAppErrorSaga(response.data);
    } catch (error: any) {
        yield handleServerNetworkErrorSaga(error);
    }
}


export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga);
    yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga);
    yield takeEvery('TASKS/ADD-TASK', addTaskWorkerSaga);
}