import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    return editMode
        ? <input
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span
            onDoubleClick={activateEditMode}
        >{props.title}</span>
};