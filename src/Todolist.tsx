import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    };
    const onClickHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else setError('Title is required');
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };
    const onAllClickHandler = () => props.changeFilter('All');
    const onActiveClickHandler = () => props.changeFilter('Active');
    const onCompletedClickHandler = () => props.changeFilter('Completed');

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
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
                <ul>
                    {props.tasks.map(t => {
                        const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
                            props.removeTask(t.id)
                        };
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked);
                        };

                        return (
                            <li
                                key={t.id}
                                className={t.isDone ? 'is-done' : ''}
                            >
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}
                                />
                                <span>{t.title}</span>
                                <button
                                    onClick={onClickHandler}
                                >x
                                </button>
                            </li>)
                    })}
                </ul>
                <div>
                    <button
                        className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}
                    >All
                    </button>
                    <button
                        className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}
                    >Active
                    </button>
                    <button
                        className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
};