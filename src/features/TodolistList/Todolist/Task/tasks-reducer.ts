import {
    addTodolistAC,
    setTodolistsAC,
    removeTodolistAC,
    addTodolistActionType,
    setTodolistsActionType,
    removeTodolistActionType
} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../../../api/todolists-api';
import {AppDispatch, AppRootStateType, AppThunk} from '../../../../app/store';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utilities/error-utilities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => state[tl.id] = []);
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) tasks.splice(index, 1);
        });
        builder.addCase(addTaskTC.fulfilled,(state, action)=>{
            state[action.payload.todoListId].unshift(action.payload);
        });
    },
})

// reducer
export const tasksReducer = slice.reducer;
/*export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType | any): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((t) => t.id === action.taskId ? {...t, ...action.model} : t)
            };
        case addTodolistAC.type:
            return {...state, [action.payload.todolist.id]: []};
        case removeTodolistAC.type: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        case setTodolistsAC.type: {
            const stateCopy = {...state};
            action.payload.todolists.forEach((tl: any) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        default:
            return state;
    }
};*/

// action creators
export const {updateTaskAC} = slice.actions;
/*export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId: todolistId,
    tasks: tasks
} as const);
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task: task} as const);
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskId: taskId
} as const);
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId: todolistId,
    taskId: taskId,
    model: model
} as const);*/

// thunks created with redux-toolkit pattern
export const fetchTasksTC = createAsyncThunk(
    'tasks/fetchTasks',
    async (param: { todolistId: string }, {dispatch}) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        const response = await todolistsAPI.getTasks(param.todolistId);
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todolistId: param.todolistId, tasks: response.data.items};
    }
);
export const removeTaskTC = createAsyncThunk(
    'tasks/removeTask',
    async (param: { todolistId: string, taskId: string }) => {
        await todolistsAPI.deleteTask(param.todolistId, param.taskId);
        return {todolistId: param.todolistId, taskId: param.taskId};
    }
);
export const addTaskTC = createAsyncThunk(
    '',
    async (param: {todolistId: string, title: string}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        try {
            const response = await todolistsAPI.createTask(param.todolistId, param.title);
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}));
                return response.data.data.item;
            } else {
                handleServerAppError(response.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch: AppDispatch, getState: () => AppRootStateType) => {
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
            .then(r => {
                if (r.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId: todolistId, taskId: taskId, model: domainModel}))
                } else handleServerAppError(r.data, dispatch);
            })
            .catch(error => handleServerNetworkError(error, dispatch));
    };
};

// types
export type TasksActionsType =
    | ReturnType<typeof updateTaskAC>
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