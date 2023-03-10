import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {todolistsReducer, tasksReducer} from '../features/TodolistList';
import {v1} from 'uuid';
import {appReducer} from '../features/Application';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Authentication';
import {configureStore} from '@reduxjs/toolkit';
import {AppRootStateType, RootReducerType} from '../utilities/types';
import {TaskPriorities, TaskStatuses} from '../api/types';

const rootReducer: RootReducerType = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

const initialStore: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML5 & SCSS',
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '',
                deadline: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'JAVASCRIPT ES6',
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '', deadline: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'REACT JS v18.2',
                status: TaskStatuses.InProgress,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '',
                deadline: '',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Headphones with ANC',
                status: TaskStatuses.InProgress,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '',
                deadline: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Monitor 16:18',
                status: TaskStatuses.InProgress,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '',
                deadline: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Computer: ASUS DASH 15 white',
                status: TaskStatuses.InProgress,
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Middle,
                description: '',
                deadline: '',
                todoListId: 'todolistId2',
            }
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    },
};

//export const storyBookStore = createStore(rootReducer, initialStore as AppRootStateType, applyMiddleware(thunk));
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialStore,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};

/*
export const BrowserRouterDecorator = (storyFn: any) => {
    return (
        <HashRouter>
            {storyFn()}
        </HashRouter>
    );
};*/
