import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', () => {
    const startState: TodolistType[] = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ];
    const endState = todolistsReducer(startState, removeTodolistAC(startState[0].id));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});
test('correct todolist should be added correctly', () => {
    const startState: TodolistType[] = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ];
    const newTitle = 'What to do';
    const endState = todolistsReducer(startState, addTodolistAC(newTitle));
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});
test('correct todolist title should be changed', () => {
    const startState: TodolistType[] = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ];
    const newTitle = 'What to do';
    const endState = todolistsReducer(startState, changeTodolistTitleAC(startState[0].id, newTitle));
    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(startState[1].title);
});
test('correct filter of todolist should be changed', () => {
    const startState: TodolistType[] = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ];
    const newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, changeTodolistFilterAC(startState[0].id, newFilter));
    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe(startState[1].filter);
});