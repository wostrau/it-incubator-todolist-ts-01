import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistList/Todolist/todolists-reducer'
import {TasksActionsType, tasksReducer} from '../features/TodolistList/Todolist/Task/tasks-reducer'
import {AppActionsType, appReducer} from './app-reducer'
import {authReducer, LoginActionsType} from '../features/Login/auth-reducer'
import createSagaMiddleware from 'redux-saga'
import {
    addTaskWorkerSaga,
    fetchTasksWorkerSaga,
    removeTaskWorkerSaga,
    tasksWatcherSaga
} from '../features/TodolistList/Todolist/Task/tasks-saga'
import {initializeAppWatcherSaga, initializeAppWorkerSaga} from './app-saga'
import {takeEvery} from 'redux-saga/effects'
import {all} from 'axios'

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    //yield all([initializeAppWatcherSaga(), tasksWatcherSaga()])
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga)
    yield takeEvery('TASKS/ADD-TASK', addTaskWorkerSaga)
}

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | LoginActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>

// @ts-ignore
window.store = store


