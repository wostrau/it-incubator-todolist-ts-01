import {AppInitialStateType, appReducer, RequestStatusType, setErrorAC, setStatusAC} from './app-reducer';

let startState: AppInitialStateType;
beforeEach(()=>{
    startState = {
        status: 'idle',
        error: null
    }
});

test('correct error message should be set',()=>{
    const errorMessage = 'some error';
    const endState = appReducer(startState, setErrorAC(errorMessage));

    expect(endState.error).toBe(errorMessage);
});
test('correct app status should be set',()=>{
    const appStatus: RequestStatusType = 'loading';
    const endState = appReducer(startState, setStatusAC(appStatus));

    expect(endState.status).toBe(appStatus);
});