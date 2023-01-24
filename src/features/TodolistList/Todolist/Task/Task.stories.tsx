import {Task} from './Task';
import React from 'react';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolists-api';

export default {
    title: 'Task component',
    component: Task
}

export const TaskBaseExample = (props: any) => {
    const task1 = {
        description: '',
        title: 'HTML',
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: '1.1',
        order: 0,
        addedDate: '',
    } as TaskType;
    const task2 = {
        description: '',
        title: 'CSS',
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: '2',
        todoListId: '1.1',
        order: 0,
        addedDate: '',
    } as TaskType;

    return (
        <>
            <Task
                task={task1}
            />
            <Task
                task={task2}
            />
        </>
    )
};