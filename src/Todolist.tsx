import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from './App';

type PropsType = {
    id: string
    title: string
    tasks: Array<{
        id: string
        title: string
        isDone: boolean
    }>
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    };
    const onClickHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else setError('Title is required');
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    };
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id);
    };

    return (
        <div>
            <div>
                <h3>
                    {props.title}
                    <button
                        onClick={removeTodolistHandler}
                    >x</button>
                </h3>
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
                            props.removeTask(t.id, props.id)
                        };
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id);
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
                        className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}
                    >All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}
                    >Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
};