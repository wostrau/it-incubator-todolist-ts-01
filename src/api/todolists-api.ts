import axios, {AxiosResponse} from 'axios';

// network settings
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
});

// API
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
    getTasks(todolistId: string): Promise<AxiosResponse<GetTasksResponseType>> {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    deleteTask(todolistId: string, taskId: string): Promise<AxiosResponse<ResponseType>> {
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

// enums
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgent = 3,
    Later = 4
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
};
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
};
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
};
export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
};
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean,
    captcha?: string
};

