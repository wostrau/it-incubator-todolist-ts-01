import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from '../../../app/store';

// initial state
const initialSate: TodolistDomainType[] = [];

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialSate, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
        default:
            return state;
    }
};

// action creators
export const setTodolistsAC = (todolists: TodolistType[]) => {
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

// thunk creators
export const fetchTodolistsTC = (): AppThunk => dispatch => {
    todolistsAPI.getTodolists()
        .then(r => dispatch(setTodolistsAC(r.data)));
};
export const removeTodolistTC = (id: string): AppThunk => dispatch => {
    todolistsAPI.deleteTodolist(id)
        .then(r => dispatch(removeTodolistAC(id)));
};
export const addTodolistTC = (title: string): AppThunk => dispatch => {
    todolistsAPI.createTodolist(title)
        .then(r => dispatch(addTodolistAC(r.data.data.item)));
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => dispatch => {
    todolistsAPI.updateTodolistTitle(id, title)
        .then(r => dispatch(changeTodolistTitleAC(id, title)))
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
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
};