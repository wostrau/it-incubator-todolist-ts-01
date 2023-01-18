// initial state
import {AppThunk} from './store';

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false,
};

// reducer
export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, initialized: action.value}
        default:
            return {...state}
    }
};

// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error: error} as const);
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value: value} as const);

// thunk creator
export const initializedAppTC = (): AppThunk => dispatch => {

};

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
    status: RequestStatusType,
    error: string | null,
    initialized: boolean
};
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>;

