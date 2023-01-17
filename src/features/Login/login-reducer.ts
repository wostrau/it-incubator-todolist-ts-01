import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';

// initial state
const initialState: LoginStateType = {};

// reducer
export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

// action creators
/*export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId: todolistId,
    tasks: tasks
} as const);*/

// thunk creators
export const loginTC = (data: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then(r => {
            if (r.data.resultCode === 0) {
                alert('YOU HAVE LOGGED IN')
                dispatch(setAppStatusAC('succeeded'));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};

// types
export type LoginActionsType = any;
export type LoginStateType = {};