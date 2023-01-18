import {AppInitialStateType, appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: AppInitialStateType;
beforeEach(()=>{
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
});

test('correct error message should be set',()=>{
    const errorMessage = 'some error';
    const endState = appReducer(startState, setAppErrorAC(errorMessage));

    expect(endState.error).toBe(errorMessage);
});
test('correct app status should be set',()=>{
    const appStatus: RequestStatusType = 'loading';
    const endState = appReducer(startState, setAppStatusAC(appStatus));

    expect(endState.status).toBe(appStatus);
});