import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            props.addItem(title.trim());
            setTitle('');
        }
    };
    const onClickHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else setError('Title is required');
    };

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button
                onClick={onClickHandler}
            >+
            </button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};