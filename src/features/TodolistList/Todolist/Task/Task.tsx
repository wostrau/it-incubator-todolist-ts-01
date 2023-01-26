import React, {ChangeEvent, useCallback} from 'react';
import '../../../../app/App.css';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Clear} from '@mui/icons-material';
import {tasksActions} from '../../index';
import {TaskStatuses, TaskType} from '../../../../api/types';
import {useActions} from '../../../../utilities/redux-utilities';

type PropsType = { task: TaskType };
export const Task = React.memo((props: PropsType) => {
    const {updateTaskTC, removeTaskTC} = useActions(tasksActions);
    const onClickHandler = useCallback(() => {
        removeTaskTC({todolistId: props.task.todoListId, taskId: props.task.id});
    }, [props, removeTaskTC]);
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        updateTaskTC({
            todolistId: props.task.todoListId,
            taskId: props.task.id,
            model: {
                status: event.currentTarget.checked
                    ? TaskStatuses.Completed
                    : TaskStatuses.InProgress
            },
        });
    }, [props, updateTaskTC]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        updateTaskTC({todolistId: props.task.todoListId, taskId: props.task.id, model: {title: newTitle}});
    }, [props, updateTaskTC]);

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