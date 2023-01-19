// initial state
import {AppThunk} from './store';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    error: null,
    isInitialized: false,
} as AppInitialStateType;

// slice
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

// reducer
export const appReducer = slice.reducer;
/*export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
};*/

// action creators
export const {
    setAppStatusAC,
    setAppErrorAC,
    setAppInitializedAC
} = slice.actions;
/*export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error: error} as const);
export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized: isInitialized
} as const);*/

// thunk creator
export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me()
        .then(r => {
            if (r.data.resultCode === 0) dispatch(setIsLoggedInAC({isLoggedIn: true}));
            dispatch(setAppInitializedAC({isInitialized: true}));
        });
};

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
};
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>;
