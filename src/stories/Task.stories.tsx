import {Task} from '../features/Todolist/Task/Task';
import {action} from '@storybook/addon-actions';
import React from 'react';
import {TaskStatuses} from '../api/todolists-api';

export default {
    title: 'Task component',
    component: Task
}

const removeTaskCallback = action('Task removed');
const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                id={'1'}
                title={'HTML5'}
                status={TaskStatuses.Completed}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={()=>{}}
            />
            <Task
                id={'2'}
                title={'SCSS'}
                status={TaskStatuses.InProgress}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
            />
        </>
    )
};