import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {v1} from 'uuid';

// cases
const removeTodolistCase = 'REMOVE-TODOLIST';
const addTodolistCase = 'ADD-TODOLIST';
const changeTodolistTitleCase = 'CHANGE-TODOLIST-TITLE';
const changeTodolistFilterCase = 'CHANGE-TODOLIST-FILTER';

// initial state
const initialSate: TodolistType[] = [];

// reducer
export const todolistsReducer = (state: TodolistType[] = initialSate, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case removeTodolistCase:
            return state.filter(tl => tl.id !== action.id);
        case addTodolistCase:
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state];
        case changeTodolistTitleCase: {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.title = action.title;
            return [...state];
        }
        case changeTodolistFilterCase: {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.filter = action.filter;
            return [...state];
        }
        default:
            return state;
    }
};

// action creators
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: removeTodolistCase, id: todolistId};
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: addTodolistCase, title: title, todolistId: v1()};
};
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: changeTodolistTitleCase, id: todolistId, title: title};
};
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: changeTodolistFilterCase, id: todolistId, filter: filter};
};

// types
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
