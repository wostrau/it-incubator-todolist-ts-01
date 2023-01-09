import {Provider} from 'react-redux';
import {AppRootStateType} from './state/store';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {todolistsReducer} from './state/todolists-reducer';
import {tasksReducer} from './state/tasks-reducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const initialStore: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML5 & SCSS', isDone: true},
            {id: v1(), title: 'JAVASCRIPT ES6', isDone: true},
            {id: v1(), title: 'REACT JS v18.2', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Headphones with ANC', isDone: false},
            {id: v1(), title: 'Monitor 16:18', isDone: false},
            {id: v1(), title: 'Computer: MAC 14 PRO || ASUS 15 DASH', isDone: false}
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