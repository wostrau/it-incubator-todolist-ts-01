import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from '../todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../../../api/todolists-api'
import {AppDispatch, AppRootStateType, AppThunk} from '../../../../app/store'
import {setAppStatusAC} from '../../../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../../../utilities/error-utilities'

// initial state
const initialState: TasksStateType = {}

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((t) => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// action creators
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId: todolistId,
    tasks: tasks
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task: task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskId: taskId
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId: todolistId,
    taskId: taskId,
    model: model
} as const)

// thunk creators
/*export const fetchTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTasks(todolistId)
        .then(r => {
            dispatch(setTasksAC(todolistId, r.data.items));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(r => dispatch(removeTaskAC(todolistId, taskId)))
        .catch(error => handleServerNetworkError(error, dispatch));
};*/
/*export const addTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTask(todolistId, title)
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(addTaskAC(r.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else handleServerAppError(r.data, dispatch);
        })
        .catch(error => handleServerNetworkError(error, dispatch));
};*/
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found')
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
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(r => {
                if (r.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel))
                } else handleServerAppError(r.data, dispatch)
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
}

// types
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | setTodolistsActionType
    | removeTodolistActionType
    | addTodolistActionType;
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};
export type TasksStateType = {
    [key: string]: TaskType[]
};