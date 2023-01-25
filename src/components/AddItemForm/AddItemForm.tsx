import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void };
type PropsType = {
    addItem: (title: string, helpers: AddItemFormSubmitHelperType) => Promise<any>
    disabled?: boolean
};

export const AddItemForm = React.memo(({addItem, disabled = false}: PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = async () => {
        if (title.trim() !== '') {
            await addItem(title.trim(), {setError, setTitle});
        } else setError('Title is required');
    };
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (event.key === 'Enter') addItemHandler();
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
                onClick={addItemHandler}
                disabled={disabled}
                style={{marginLeft: '5px'}}
            >
                <ControlPoint/>
            </IconButton>
        </div>
    );
});