import {TodolistsActionsType, todolistsReducer} from '../features/TodolistList/Todolist/todolists-reducer';
import {TasksActionsType, tasksReducer} from '../features/TodolistList/Todolist/Task/tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// types
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppActionsType = TodolistsActionsType | TasksActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>;

// @ts-ignore
window.store = store;


