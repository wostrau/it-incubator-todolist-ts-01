import React, {ChangeEvent, useCallback} from 'react';
import './App.css';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type PropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.id);
    }, [props]);
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, event.currentTarget.checked);
    }, [props]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.id, newTitle);
    }, [props]);

    return (
        <div
            style={props.isDone ? {opacity: '0.5'} : {}}
            key={props.id}
        >
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.isDone}
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