import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from '../features/Application';
import {authReducer} from '../features/Authentication';
import {tasksReducer, todolistsReducer} from '../features/TodolistList/';
import {AppRootStateType} from '../utilities/types';


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;


