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
export type FieldErrorType = { field: string, error: string };
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<FieldErrorType>
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