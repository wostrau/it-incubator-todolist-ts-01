import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../../../api/todolists-api';
import {AppRootStateType} from '../../../../app/store';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utilities/error-utilities';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
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
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model};
        });
    },
})

// reducer
export const tasksReducer = slice.reducer;

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
    'tasks/addTask',
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
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
export const updateTaskTC = createAsyncThunk(
    'tasks/updateTask',
    async (
        param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType },
        {dispatch, rejectWithValue, getState}
    ) => {
        const state = getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId);
        if (!task) return rejectWithValue('task not found')

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            ...param.model
        };
        const response = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel);
        try {
            if (response.data.resultCode === 0) {
                return param;
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

// types
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