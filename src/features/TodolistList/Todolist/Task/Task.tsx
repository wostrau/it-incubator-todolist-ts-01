import React, {ChangeEvent, useCallback} from 'react';
import '../../../../app/App.css';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Clear} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {useActions} from '../../../../app/store';
import {tasksActions} from '../../index';

type PropsType = { task: TaskType };
export const Task = React.memo((props: PropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions);
    const onClickHandler = useCallback(() => {
        removeTask({todolistId: props.task.todoListId, taskId: props.task.id});
    }, [props, removeTask]);
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId: props.task.todoListId,
            taskId: props.task.id,
            model: {
                status: event.currentTarget.checked
                    ? TaskStatuses.Completed
                    : TaskStatuses.InProgress
            },
        });
    }, [props, updateTask]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        updateTask({todolistId: props.task.todoListId, taskId: props.task.id, model: {title: newTitle}});
    }, [props, updateTask]);

    return (
        <div
            style={props.task.status === TaskStatuses.Completed ? {position: 'relative', opacity: '0.5'} : {position: 'relative'}}
            key={props.task.id}
        >
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton
                style={{position: 'absolute', top: '0px', right: '0px'}}
                onClick={onClickHandler}
                size='medium'
            >
                <Clear fontSize={'small'} style={{fill: 'lightsalmon'}}/>
            </IconButton>
        </div>
    );
});