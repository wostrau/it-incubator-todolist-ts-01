import {authAPI} from '../../api/todolists-api';
import {authActions} from '../Authentication';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'application',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    } as AppInitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
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