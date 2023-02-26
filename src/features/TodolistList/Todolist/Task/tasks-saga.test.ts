import {addTaskWorkerSaga, fetchTasksWorkerSaga} from './tasks-saga'
import {call, put} from 'redux-saga/effects'
import {setAppErrorAC, setAppStatusAC} from '../../../../app/app-reducer'
import {
    GetTasksResponseType,
    ResponseType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI
} from '../../../../api/todolists-api'
import {addTaskAC, setTasksAC} from './tasks-reducer'


let tasksResponse: GetTasksResponseType
let task: TaskType
let taskResponse: ResponseType<{ item: TaskType }>
const todolistId = 'todolistId'
beforeEach(() => {
    taskResponse = {
        resultCode: 0,
        data: {item: task},
        messages: []
    }
    task = {
        id: '',
        todoListId: todolistId,
        title: 'NEW TASK',
        description: '',
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Middle,
        deadline: '',
        startDate: '',
        addedDate: '',
        order: 0
    }
    tasksResponse = {
        error: '',
        totalCount: 1,
        items: [task as TaskType]
    }
})

test('fetchTasks saga resolves successfully', () => {
    const generator = fetchTasksWorkerSaga({type: 'TASKS/FETCH-TASKS', todolistId: todolistId})
    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(generator.next().value).toEqual(call(todolistsAPI.getTasks, todolistId))
    expect(generator.next(tasksResponse).value).toEqual(put(setTasksAC(todolistId, tasksResponse.items)))
    expect(generator.next().value).toEqual(put(setAppStatusAC('succeeded')))
})

test('addTask saga resolves successfully', () => {
    const title = 'NEW TASK'
    const generator = addTaskWorkerSaga({type: 'TASKS/ADD-TASK', payload: {todolistId: todolistId, title: title}})
    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(generator.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))
    expect(generator.next(taskResponse).value).toEqual(put(addTaskAC(taskResponse.data.item)))
    expect(generator.next().value).toEqual(put(setAppStatusAC('succeeded')))
})

test('addTask saga rejects with error', () => {
    const title = 'NEW TASK'
    const generator = addTaskWorkerSaga({type: 'TASKS/ADD-TASK', payload: {todolistId: todolistId, title: title}})
    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(generator.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))
    const message = 'some error'
    expect(generator.throw({message: message})).toEqual(put(setAppErrorAC(message)))
    expect(generator.next().value).toEqual(put(setAppStatusAC('failed')))
})

