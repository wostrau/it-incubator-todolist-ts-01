import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistList/Todolist/todolists-reducer';
import {TasksActionsType, tasksReducer} from '../features/TodolistList/Todolist/Task/tasks-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {LoginActionsType, loginReducer} from '../features/Login/login-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// types
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | LoginActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>;

// @ts-ignore
window.store = store;


