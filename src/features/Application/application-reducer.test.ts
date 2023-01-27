import {appReducer} from './index';
import {AppInitialStateType, RequestStatusType} from './application-reducer';
import {appActions} from '../commonActions/appActions';

let startState: AppInitialStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
});

test('correct error message should be set', () => {
    const errorMessage = 'some error';
    const endState = appReducer(startState, appActions.setAppErrorAC({error: errorMessage}));

    expect(endState.error).toBe(errorMessage);
});
test('correct app status should be set', () => {
    const appStatus: RequestStatusType = 'loading';
    const endState = appReducer(startState, appActions.setAppStatusAC({status: appStatus}));

    expect(endState.status).toBe(appStatus);
});