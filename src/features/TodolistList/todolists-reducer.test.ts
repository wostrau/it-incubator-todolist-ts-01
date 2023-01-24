import {v1} from 'uuid';
import {
    changeTodolistEntityStatus,
    changeTodolistFilter,
    FilterValuesType,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {RequestStatusType} from '../../app/app-reducer';
import {useActions} from '../../app/store';
import {todolistsActions} from './index';

const {addTodolist, fetchTodolists, removeTodolist, changeTodolistTitle} = useActions(todolistsActions);
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
})

test('correct todolist should be removed', () => {
    const param = {id: startState[0].id};
    const endState = todolistsReducer(startState, removeTodolist.fulfilled(param, 'requestId', param));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});
test('correct todolist should be added correctly', () => {
    const newTitle = 'What to do';
    const newTodolist = {id: v1(), title: newTitle, filter: 'all', order: 0, addedDate: ''};
    const endState = todolistsReducer(startState, addTodolist.fulfilled({todolist: newTodolist}, 'requestId', {title: newTitle}));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});
test('correct todolist title should be changed', () => {
    const newTitle = 'What to do';
    const param = {id: startState[0].id, title: newTitle};
    const endState = todolistsReducer(startState, changeTodolistTitle.fulfilled(param, 'requestId', param));

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(startState[1].title);
});
test('todolist filter should be changed correctly', () => {
    const newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, changeTodolistFilter({id: startState[0].id, filter: newFilter}));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe(startState[1].filter);
});
test('todolist status should be changed correctly', () => {
    const newStatus: RequestStatusType = 'loading';
    const endState = todolistsReducer(startState, changeTodolistEntityStatus({
        id: startState[0].id,
        status: newStatus
    }));

    expect(endState[0].entityStatus).toBe(newStatus);
    expect(endState[1].entityStatus).toBe(startState[1].entityStatus);
});
test('correct todolists should be set to the state', () => {
    const action = fetchTodolists.fulfilled({todolists: startState}, 'requestId');
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});