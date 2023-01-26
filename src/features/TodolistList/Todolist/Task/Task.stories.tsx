import {Task} from './Task';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../../../../stories/ReduxStoreProviderDecorator';
import {withRouter} from 'storybook-addon-react-router-v6';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/types';

export default {
    title: 'Task component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
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