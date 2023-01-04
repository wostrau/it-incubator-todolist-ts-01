import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

// cases
const removeTodolistCase = 'REMOVE-TODOLIST';
const addTodolistCase = 'ADD-TODOLIST';
const changeTodolistTitleCase = 'CHANGE-TODOLIST-TITLE';
const changeTodolistFilterCase = 'CHANGE-TODOLIST-FILTER';

// reducer
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case removeTodolistCase:
            return state.filter(tl => tl.id !== action.id);
        case addTodolistCase:
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
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
            throw new Error('I don\'t know this type of action');
    }
};

// action creators
export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: removeTodolistCase, id: id};
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: addTodolistCase, title: title};
};
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: changeTodolistTitleCase, id: id, title: title};
};
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: changeTodolistFilterCase, id: id, filter: filter};
};

// types
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
};
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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
