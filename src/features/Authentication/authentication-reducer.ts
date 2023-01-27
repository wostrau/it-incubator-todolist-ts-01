import {authAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginParamsType} from '../../api/types';
import {ThunkErrorType} from '../../utilities/types';
import {appActions} from '../commonActions/appActions';

export const slice = createSlice({
    name: 'authentication',
    initialState: {isLoggedIn: false} as LoginStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<LoginStateType>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false;
            });
    },
});

const loginTC = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>(
    'authentication/login',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.login(param);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            } else {
                return handleServerAppError(response.data, thunkAPI);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    });
const logoutTC = createAsyncThunk(
    'auth/logout',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            } else {
                return handleServerAppError(response.data, thunkAPI);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    });
export const authAsyncActions = {loginTC, logoutTC}

export type LoginStateType = { isLoggedIn: boolean };
