import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from '../../../app/store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../utilities/error-utilities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// initial state
const initialState = [] as TodolistDomainType[];

// slice
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{todolists: TodolistType[]}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        },
        removeTodolistAC(state, action: PayloadAction<{id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) state.splice(index, 1);
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
    },
});

// reducer
export const todolistsReducer = slice.reducer;
/*export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
        default:
            return state;
    }
};*/

// action creators
export const {
    setTodolistsAC,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions;
/*export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists: todolists} as const;
};
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const;
};
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist: todolist} as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const;
};
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: id, status: status} as const;
};*/

// thunk creators
export const fetchTodolistsTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.getTodolists()
        .then(r => {
                dispatch(setTodolistsAC({todolists: r.data}));
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
        .catch(error => handleServerNetworkError(error, dispatch));
};
export const removeTodolistTC = (id: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({id: id, status: 'loading'}))
    todolistsAPI.deleteTodolist(id)
        .then(r => {
            dispatch(removeTodolistAC({id: id}))
            dispatch(setAppStatusAC({status: 'succeeded'}));
        });
};
export const addTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.createTodolist(title)
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: r.data.data.item}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                if (r.data.messages.length) {
                    dispatch(setAppErrorAC({error: r.data.messages[0]}));
                } else dispatch(setAppErrorAC({error: 'some error'}));
                dispatch(setAppStatusAC({status: 'failed'}));
            }
        });
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => dispatch => {
    todolistsAPI.updateTodolistTitle(id, title)
        .then(r => dispatch(changeTodolistTitleAC({id: id, title: title})))
};

// types
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type addTodolistActionType = ReturnType<typeof addTodolistAC>;
export type TodolistsActionsType =
    | setTodolistsActionType
    | removeTodolistActionType
    | addTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
};