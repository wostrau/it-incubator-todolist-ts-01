import {call, put, takeEvery} from 'redux-saga/effects';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {setAppInitializedAC} from './app-reducer';

export function* initializeAppWorkerSaga(): Generator<any, void, any> {
    const response = yield call(authAPI.me);
    if (response.data.resultCode === 0) yield put(setIsLoggedInAC(true));
    yield put(setAppInitializedAC(true));
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'});

export function* initializeAppWatcherSaga() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga);
}