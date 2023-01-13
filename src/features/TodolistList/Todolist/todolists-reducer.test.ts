import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let startState: TodolistDomainType[] = [];
beforeEach(() => {
    startState = [
        {id: v1(), title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: v1(), title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ];
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(startState[0].id));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});
test('correct todolist should be added correctly', () => {
    const newTitle = 'What to do';
    const newTodolist = {id: v1(), title: newTitle, filter: 'all', order: 0, addedDate: ''};
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});
test('correct todolist title should be changed', () => {
    const newTitle = 'What to do';
    const endState = todolistsReducer(startState, changeTodolistTitleAC(startState[0].id, newTitle));

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(startState[1].title);
});
test('todolist filter should be changed correctly', () => {
    const newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, changeTodolistFilterAC(startState[0].id, newFilter));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe(startState[1].filter);
});
test('correct todolists should be set to the state', () => {
    const action = setTodolistsAC(startState);
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});