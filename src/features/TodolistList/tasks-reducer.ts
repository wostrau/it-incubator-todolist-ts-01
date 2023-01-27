import {todolistsAPI} from '../../api/todolists-api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../utilities/error-utilities';
import {todolistsActions} from './index';
import {AppRootStateType, ThunkErrorType} from '../../utilities/types';
import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/types';
import {appActions} from '../commonActions/appActions';


export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsActions.removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(todolistsActions.fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl: any) => state[tl.id] = []);
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) tasks.splice(index, 1);
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload);
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model};
            });
    },
});

const fetchTasksTC = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, { todolistId: string }, ThunkErrorType>(
    'tasks/fetchTasks',
    async (param: { todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await todolistsAPI.getTasks(param.todolistId);
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            return {todolistId: param.todolistId, tasks: response.data.items};
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
);
const removeTaskTC = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkErrorType>(
    'tasks/removeTask',
    async (param) => {
        await todolistsAPI.deleteTask(param.todolistId, param.taskId);
        return {todolistId: param.todolistId, taskId: param.taskId};
    }
);
const addTaskTC = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkErrorType>(
    'tasks/addTask', async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}));
        try {
            const response = await todolistsAPI.createTask(param.todolistId, param.title);
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
                return response.data.data.item;
            } else {
                return handleServerAppError(response.data, thunkAPI, false);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
);
const updateTaskTC = createAsyncThunk(
    'tasks/updateTask',
    async (
        param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType },
        thunkAPI
    ) => {
        const state = thunkAPI.getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId);
        if (!task) return thunkAPI.rejectWithValue('task not found')

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
                return handleServerAppError(response.data, thunkAPI, false);
            }
        } catch (error: any) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
);
export const tasksAsyncActions = {fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC};

export type UpdateDomainTaskModelType = {
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