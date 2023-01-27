import {todolistsAPI} from '../../api/todolists-api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';
import {RequestStatusType} from '../Application';
import {ThunkErrorType} from '../../utilities/types';
import {TodolistType} from '../../api/types';
import {appActions} from '../commonActions/appActions';

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id);
                state[index].title = action.payload.title;
            });
    }
});

const fetchTodolistsTC = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkErrorType>(
    'todolists/fetchTodolists',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await todolistsAPI.getTodolists()
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {todolists: response.data};
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
);
const removeTodolistTC = createAsyncThunk<{ id: string }, { id: string }, ThunkErrorType>(
    'todolists/removeTodolist',
    async (param: { id: string }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        await todolistsAPI.deleteTodolist(param.id);
        try {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            return {id: param.id};
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI, false);
        }
    }
);
const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, { title: string }, ThunkErrorType>(
    'todolists/addTodolist', async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await todolistsAPI.createTodolist(param.title);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
                return {todolist: response.data.data.item};
            } else {
                return handleServerAppError(response.data, thunkAPI, false);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
);
const changeTodolistTitleTC = createAsyncThunk(
    'todolists/changeTodolistTitle',
    async (param: { id: string, title: string }, thunkAPI) => {
        try {
            const response = await todolistsAPI.updateTodolistTitle(param.id, param.title);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
                return {id: param.id, title: param.title};
            } else {
                return handleServerAppError(response.data, thunkAPI);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI, false);
        }
    }
);
export const todolistsAsyncActions = {fetchTodolistsTC, removeTodolistTC, addTodolistTC, changeTodolistTitleTC};

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType };