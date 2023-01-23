import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utilities/error-utilities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
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
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) state.splice(index, 1);
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        });
    }
});
export const todolistsReducer = slice.reducer;
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions;

export const fetchTodolistsTC = createAsyncThunk(
    'todolists/fetchTodolists',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        const response = await todolistsAPI.getTodolists()
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: response.data};
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);
export const removeTodolistTC = createAsyncThunk(
    'todolists/removeTodolist',
    async (param: { id: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        await todolistsAPI.deleteTodolist(param.id);
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return {id: param.id};
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);
export const addTodolistTC = createAsyncThunk(
    'todolists/addTodolist',
    async (param: { title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        const response = await todolistsAPI.createTodolist(param.title);
        try {
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}));
                return {todolist: response.data.data.item};
            } else {
                handleServerAppError(response.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);
export const changeTodolistTitleTC = createAsyncThunk(
    'todolists/changeTodolistTitle',
    async (param: { id: string, title: string }, {dispatch}) => {
        await todolistsAPI.updateTodolistTitle(param.id, param.title);
        return {id: param.id, title: param.title};
    }
);

export type TodolistsActionsType =
    ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType };