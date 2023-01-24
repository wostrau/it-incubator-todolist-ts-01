import {tasksAsyncActions} from './tasks-reducer';
import {todolistsAsyncActions} from './todolists-reducer';
import {slice} from './todolists-reducer';

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
};

const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
};

export {tasksActions, todolistsActions};