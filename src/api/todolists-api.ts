import axios from 'axios';
import {
    GetTasksResponseType,
    LoginParamsType,
    ResponseType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from './types';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
});

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`);
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title: title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me');
    },
};

