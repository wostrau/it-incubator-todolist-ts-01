import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

// slice
export const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false} as LoginStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<LoginStateType>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    },
});

// reducer
export const authReducer = slice.reducer;
/*export const authReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        default:
            return state;
    }
};*/

// action creators
export const {setIsLoggedInAC} = slice.actions;
/*export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn: isLoggedIn
} as const);*/

// thunk creators
const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>(
    'auth/login',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.login(param);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(response.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue({
                    errors: response.data.messages,
                    fieldsErrors: response.data.fieldsErrors
                });
            }
        } catch (err: any) {
            const error: AxiosError = err;
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({
                errors: [error.message],
                fieldsErrors: undefined
            });
        }
    });
const logout = createAsyncThunk(
    'auth/logout',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(response.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue({
                    errors: response.data.messages,
                    fieldsErrors: response.data.fieldsErrors
                });
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({
                errors: [error.message],
                fieldsErrors: undefined
            });
        }
    });
export const authAsyncActions = {login, logout}
/*export const loginTC = (data: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.login(data)
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};*/
/*export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.logout()
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};*/

// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>;
export type LoginStateType = { isLoggedIn: boolean };
