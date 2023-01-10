import {TasksStateType} from '../AppWithRedux';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equal', ()=>{
    const startTodolistsState: TodolistDomainType[] = [];
    const startTasksState: TasksStateType = {};

    const action = addTodolistAC('NEW todolist');

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});