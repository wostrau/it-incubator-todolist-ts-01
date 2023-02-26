import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {AppDispatch} from '../app/store';
import {put} from 'redux-saga/effects';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else dispatch(setAppErrorAC('some error'));
    dispatch(setAppStatusAC('failed'));
};

export function* handleServerAppErrorSaga<D>(data: ResponseType<D>) {
    if (data.messages.length) {
        yield put(setAppErrorAC(data.messages[0]));
    } else yield put(setAppErrorAC('some error'));
    yield put(setAppStatusAC('failed'));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'some error'));
    dispatch(setAppStatusAC('failed'));
};

export function* handleServerNetworkErrorSaga(error: { message: string }) {
    yield put(setAppErrorAC(error.message ? error.message : 'some error'));
    yield put(setAppStatusAC('failed'));
}