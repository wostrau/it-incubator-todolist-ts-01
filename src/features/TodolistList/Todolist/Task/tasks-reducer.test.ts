import {v1} from 'uuid';
import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolists-api';

let startState: TasksStateType = {};
beforeEach(() => {
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
    const action = addTaskAC({
        id: v1(),
        title: 'ANGULAR',
        status: TaskStatuses.InProgress,
        order: 0,
        description: '',
        startDate: '',
        addedDate: '',
        priority: TaskPriorities.Middle,
        deadline: '',
        todoListId: 'todolistId1'
    });
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId1'][0].title).toBe('ANGULAR');
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.InProgress);
});
test('correct task title should be changed in correct array', () => {
    const action = updateTaskAC('todolistId1', startState['todolistId1'][0].id, {title: 'REDUX'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('REDUX');
    expect(endState['todolistId2'][0].title).toBe('Monitor');
});
test('correct task status should be changed in correct array', () => {
    const action = updateTaskAC('todolistId1', startState['todolistId1'][0].id, {status: TaskStatuses.InProgress});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.InProgress);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.InProgress);
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.InProgress);
});
test('new property with new array for tasks should be added when new todolist is added', () => {
    const newTodolist = {id: v1(), title: 'What to do', filter: 'all', order: 0, addedDate: ''};
    const action = addTodolistAC(newTodolist);
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
test('empty arrays for tasks should be added correctly while setting todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'Todolist #1', order: 0, addedDate: ''},
        {id: '2', title: 'Todolist #2', order: 0, addedDate: ''}
    ]);
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});
test('tasks should be added for certain todolist correctly', () => {
    const action = setTasksAC('todolistId1', startState['todolistId1']);
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
});