import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
};

export const AddItemForm = React.memo(({addItem, disabled = false}: PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (event.key === 'Enter') {
            if (title.trim() !== '') {
                addItem(title.trim());
                setTitle('');
            } else setError('Title is required');
        }
    };
    const onClickHandler = () => {
        if (error !== null) setError(null);
        if (title.trim() !== '') {
            addItem(title.trim());
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
                disabled={disabled}
            />
            <IconButton
                color={'primary'}
                onClick={onClickHandler}
                disabled={disabled}
            >
                <ControlPoint/>
            </IconButton>
        </div>
    );
});