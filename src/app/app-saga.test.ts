import {initializeAppWorkerSaga} from './app-saga';
import {authAPI, MeResponseType} from '../api/todolists-api';
import {call, put} from 'redux-saga/effects';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {setAppInitializedAC} from './app-reducer';


let meResponse: MeResponseType;
beforeEach(() => {
    meResponse = {
        resultCode: 0,
        data: {
            id: 1,
            email: '',
            login: ''
        },
        messages: []
    };
});

test('initializeApp saga logins successfully', () => {
    const generator = initializeAppWorkerSaga();
    expect(generator.next().value).toEqual(call(authAPI.me));
    expect(generator.next(meResponse).value).toEqual(put(setIsLoggedInAC(true)));
    expect(generator.next().value).toEqual(put(setAppInitializedAC(true)));
});

test('initializeApp saga logins unsuccessfully', () => {
    const generator = initializeAppWorkerSaga();
    expect(generator.next().value).toEqual(call(authAPI.me));
    meResponse.resultCode = 1;
    expect(generator.next(meResponse).value).toEqual(put(setAppInitializedAC(true)));
});
