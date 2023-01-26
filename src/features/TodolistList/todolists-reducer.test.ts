import {v1} from 'uuid';
import {RequestStatusType} from '../Application';
import {todolistsActions, todolistsReducer} from './index';
import {FilterValuesType, TodolistDomainType} from './todolists-reducer';
import {ThunkError} from '../../utilities/types';

let startState: TodolistDomainType[] = [];
beforeEach(() => {
    startState = [
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all',
            order: 0,
            addedDate: '',
            entityStatus: 'idle'
        },
        {
            id: v1(),
            title: 'What to buy',
            filter: 'all',
            order: 0,
            addedDate: '',
            entityStatus: 'idle'
        }
    ];
});

test('correct todolist should be removed', () => {
    const param = {id: startState[0].id};
    const endState = todolistsReducer(startState, todolistsActions.removeTodolistTC.fulfilled(param, 'requestId', param));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});
test('correct todolist should be added correctly', () => {
    const newTitle = 'What to do';
    const newTodolist = {id: v1(), title: newTitle, filter: 'all', order: 0, addedDate: ''};
    const endState = todolistsReducer(startState, todolistsActions.addTodolistTC.fulfilled({todolist: newTodolist}, 'requestId', {title: newTitle}));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});
test('correct todolist title should be changed', () => {
    const newTitle = 'What to do';
    const param = {id: startState[0].id, title: newTitle};
    const endState = todolistsReducer(startState, todolistsActions.changeTodolistTitleTC.fulfilled(param, 'requestId', param));

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(startState[1].title);
});
test('todolist filter should be changed correctly', () => {
    const newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilterAC({
        id: startState[0].id,
        filter: newFilter
    }));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe(startState[1].filter);
});
test('todolist status should be changed correctly', () => {
    const newStatus: RequestStatusType = 'loading';
    const endState = todolistsReducer(startState, todolistsActions.changeTodolistEntityStatusAC({
        id: startState[0].id,
        status: newStatus
    }));

    expect(endState[0].entityStatus).toBe(newStatus);
    expect(endState[1].entityStatus).toBe(startState[1].entityStatus);
});
test('correct todolists should be set to the state', () => {
    const action = todolistsActions.fetchTodolistsTC.fulfilled({todolists: startState}, 'requestId', null);
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});