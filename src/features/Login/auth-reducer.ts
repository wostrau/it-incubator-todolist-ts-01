import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// slice
const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false} as LoginStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<LoginStateType>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
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
export const loginTC = createAsyncThunk('auth/login',
    async (param: { data: LoginParamsType }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
        try {
            const response = await authAPI.login(param.data);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
                return {isLoggedIn: true};
            } else {
                handleServerAppError(response.data, thunkAPI.dispatch);
                return {isLoggedIn: false};
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch);
            return {isLoggedIn: false};
        }
    });

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
export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.logout()
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};

// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>;
export type LoginStateType = { isLoggedIn: boolean };
