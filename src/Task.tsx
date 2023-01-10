import React, {ChangeEvent, useCallback} from 'react';
import './App.css';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TaskStatuses} from './api/todolists-api';

type PropsType = {
    id: string
    title: string
    status: TaskStatuses
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.id);
    }, [props]);
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let checkedStatus: TaskStatuses;
        if (event.currentTarget.checked) {
            checkedStatus = TaskStatuses.Completed
        } else checkedStatus = TaskStatuses.InProgress;
        props.changeTaskStatus(props.id, checkedStatus);
    }, [props]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.id, newTitle);
    }, [props]);

    return (
        <div
            style={props.status === TaskStatuses.Completed ? {opacity: '0.5'} : {}}
            key={props.id}
        >
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.status === TaskStatuses.Completed}
            />
            <EditableSpan
                title={props.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton
                onClick={onClickHandler}
            >
                <Delete/>
            </IconButton>
        </div>
    );
});