import {combineReducers} from 'redux';
import {appReducer} from '../features/Application';
import {authReducer} from '../features/Authentication';
import {tasksReducer, todolistsReducer} from '../features/TodolistList';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

