import {v1} from 'uuid';
import {TasksStateType} from '../AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

let startState: TasksStateType = {};
beforeEach(()=>{
    startState = {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML5',
                status: TaskStatuses.Completed,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'SCSS',
                status: TaskStatuses.InProgress,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'JS ES6',
                status: TaskStatuses.InProgress,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Monitor',
                status: TaskStatuses.InProgress,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Computer',
                status: TaskStatuses.InProgress,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Headphones',
                status: TaskStatuses.InProgress,
                order: 0,
                description: '',
                startDate: '',
                addedDate: '',
                priority: TaskPriorities.Middle,
                deadline: '',
                todoListId: 'todolistId2'
            }
        ]
    };
});

test('correct task should be removed from correct array', () => {
    const action = removeTaskAC('todolistId1', startState['todolistId1'][0].id);
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'][0].title).toBe('SCSS');
    expect(endState['todolistId1'][0].title !== 'HTML5').toBeTruthy();
    expect(endState['todolistId1'].every(t => t.id !== startState['todolistId1'][0].id)).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTaskAC('todolistId1', 'REDUX');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId1'][0].title).toBe('REDUX');
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.InProgress);
});
test('correct task title should be changed in correct array', () => {
    const action = changeTaskTitleAC('todolistId1', startState['todolistId1'][0].id, 'REDUX');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('REDUX');
    expect(endState['todolistId2'][0].title).toBe('Monitor');
});
test('correct task status should be changed in correct array', () => {
    const action = changeTaskStatusAC('todolistId1', startState['todolistId1'][0].id, TaskStatuses.InProgress);
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.InProgress);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.InProgress);
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.InProgress);
});
test('new property with new array for tasks should be added when new todolist is added', () => {
    const action = addTodolistAC('NEW todolist');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) throw Error('new key should be added');

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});