import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';

// initial state
const initialState: LoginStateType = {
    isLoggedIn: false
};

// reducer
export const authReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        default:
            return state;
    }
};

// action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn: isLoggedIn
} as const);

// thunk creators
export const loginTC = (data: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};

// types
export type LoginActionsType =
    | ReturnType<typeof setIsLoggedInAC>;
export type LoginStateType = {
    isLoggedIn: boolean
};