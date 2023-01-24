import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistList/todolists-reducer';
import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {authReducer, LoginActionsType} from '../features/Auth/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useAppDispatch} from './hooks';

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
export type AllActionsType = TodolistsActionsType | AppActionsType | LoginActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>;
export type AppDispatchType = typeof store.dispatch;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch();

  return useMemo(() => {
      return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
}
