import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'app',
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
export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC} = slice.actions;

export const initializeAppTC = createAsyncThunk(
    'app/initializeApp',
    async (param, {dispatch}) => {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) dispatch(setIsLoggedInAC({isLoggedIn: true}));
    });

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
