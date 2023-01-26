import {tasksAsyncActions, slice as tasksSlice} from './tasks-reducer';
import {todolistsAsyncActions, slice as todolistsSlice} from './todolists-reducer';
import {TodolistList} from './TodolistList';

const todolistsActions = {...todolistsAsyncActions, ...todolistsSlice.actions};
const todolistsReducer = todolistsSlice.reducer;
const tasksActions = {...tasksAsyncActions, ...tasksSlice.actions};
const tasksReducer = tasksSlice.reducer;

export {
    todolistsActions,
    todolistsReducer,
    tasksActions,
    tasksReducer,
    TodolistList
};