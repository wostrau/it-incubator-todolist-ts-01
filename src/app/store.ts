import {combineReducers} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistList/Todolist/todolists-reducer';
import {TasksActionsType, tasksReducer} from '../features/TodolistList/Todolist/Task/tasks-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {authReducer, LoginActionsType} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
//export const store = createStore(rootReducer, applyMiddleware(thunk));

// types
export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;
export type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | LoginActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>;
export type AppDispatchType = typeof store.dispatch;
