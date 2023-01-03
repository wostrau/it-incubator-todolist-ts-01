import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type PropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            if (title.trim() !== '') {
                props.addItem(title.trim());
                setTitle('');
            } else setError('Title is required');
        }
    };
    const onClickHandler = () => {
        setError(null);
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else setError('Title is required');
    };

    return (
        <div>
            <TextField
                variant={'filled'}
                label={'Type text'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={onClickHandler}
            >
                <ControlPoint/>
            </IconButton>
        </div>
    );
};