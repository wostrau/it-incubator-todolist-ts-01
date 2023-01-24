import {v1} from 'uuid';
import {todolistsReducer, TodolistDomainType} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {useActions} from '../../app/store';
import {todolistsActions} from './index';

test('ids should be equal', ()=>{
    const startTodolistsState: TodolistDomainType[] = [];
    const startTasksState: TasksStateType = {};
    const newTodolist = {id: v1(), title: 'What to do', filter: 'all', order: 0, addedDate: ''};

    const {addTodolist} = useActions(todolistsActions);
    const action = addTodolist.fulfilled({todolist: newTodolist}, 'requestId', {title: newTodolist.title});

    const endTodolistsState = todolistsReducer(startTodolistsState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});