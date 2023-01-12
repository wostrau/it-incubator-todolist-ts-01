import {TasksStateType} from '../AppWithRedux';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {v1} from 'uuid';

test('ids should be equal', ()=>{
    const startTodolistsState: TodolistDomainType[] = [];
    const startTasksState: TasksStateType = {};
    const newTodolist = {id: v1(), title: 'What to do', filter: 'all', order: 0, addedDate: ''};

    const action = addTodolistAC(newTodolist);

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});