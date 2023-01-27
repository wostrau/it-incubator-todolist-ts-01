import {authAPI} from '../../api/todolists-api';
import {authActions} from '../Authentication';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from '../commonActions/appActions';

export const slice = createSlice({
    name: 'application',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    } as AppInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true;
            })
            .addCase(appActions.setAppStatusAC, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(appActions.setAppErrorAC, (state, action) => {
                state.error = action.payload.error;
            });
    }
});

const {setIsLoggedInAC} = authActions;
const initializeAppTC = createAsyncThunk(
    'application/initializeApp',
    async (param, {dispatch}) => {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        }
    });
export const appAsyncActions = {initializeAppTC};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
};