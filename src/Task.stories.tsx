import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import React from 'react';

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
                isDone={true}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={()=>{}}
            />
            <Task
                id={'2'}
                title={'SCSS'}
                isDone={false}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
            />
        </>
    )
};