import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    };
    const onClickHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
                        onKeyPress={onKeyPressHandler}
                    />
                    <button
                        onClick={onClickHandler}
                    >+
                    </button>
                </div>
                <ul>
                    {props.tasks.map(t => {
                        const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
                            props.removeTask(t.id)
                        };

                        return (
                            <li key={t.id}>
                                <input
                                    type="checkbox"
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
                        onClick={onAllClickHandler}
                    >All
                    </button>
                    <button
                        onClick={onActiveClickHandler}
                    >Active
                    </button>
                    <button
                        onClick={onCompletedClickHandler}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
};