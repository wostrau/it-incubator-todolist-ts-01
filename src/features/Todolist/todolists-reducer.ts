import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';

// initial state
const initialSate: TodolistDomainType[] = [];

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialSate, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: 'all'
            };
            return [newTodolist, ...state];
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.title = action.title;
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.filter = action.filter;
            return [...state];
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
        }
        default:
            return state;
    }
};

// action creators
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists};
};
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: id};
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist: todolist};
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
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
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
};
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
};
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
};
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
};