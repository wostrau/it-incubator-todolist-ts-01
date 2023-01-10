import {Provider} from 'react-redux';
import {AppRootStateType} from './state/store';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {todolistsReducer} from './state/todolists-reducer';
import {tasksReducer} from './state/tasks-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from './api/todolists-api';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const initialStore: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
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
                todoListId: 'todolistId2'
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialStore as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};