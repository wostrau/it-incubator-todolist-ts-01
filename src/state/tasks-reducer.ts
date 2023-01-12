import {TasksStateType} from '../AppWithRedux';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api';
import {AppDispatch, AppRootStateType, AppThunk} from './store';

// initial state
const initialState: TasksStateType = {};

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask = action.task;
            const tasks = stateCopy[newTask.todoListId];
            stateCopy[newTask.todoListId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map((t) => {
                return t.id === action.taskId
                    ? {...t, ...action.model}
                    : t
            });
            return {...state};
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy;
        }
        default:
            return state;
    }
};

// action creators
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId};
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task: task};
};
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId: todolistId, taskId: taskId, model: model};
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId: todolistId, tasks: tasks};
};

// thunk creators
export const fetchTasksTC = (todolistId: string): AppThunk => dispatch => {
    todolistsAPI.getTasks(todolistId)
        .then(r => dispatch(setTasksAC(todolistId, r.data.items)));
};
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(r => dispatch(removeTaskAC(todolistId, taskId)));
};
export const addTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    todolistsAPI.createTask(todolistId, title).then(r => dispatch(addTaskAC(r.data.data.item)));
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch:  AppDispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            console.warn('task not found');
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            ...domainModel
        };
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(r => dispatch(updateTaskAC(todolistId, taskId, domainModel)));
    };
};

// types
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
};
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
};
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
};
export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: TaskType[]
}
export type TasksActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType;
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};