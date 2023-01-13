import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from '@mui/material';

type PropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    console.log('editable span was called')

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);
    },[props, title]);
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }, []);

    return editMode
        ? <TextField
            variant={'standard'}
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span
            onDoubleClick={activateEditMode}
        >{props.title}</span>
});