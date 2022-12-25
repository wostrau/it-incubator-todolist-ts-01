import React, {MouseEventHandler} from 'react';
import './App.css';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button>+</button>
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
                        onClick={()=>{props.changeFilter('All')}}
                    >All</button>
                    <button
                        onClick={()=>{props.changeFilter('Active')}}
                    >Active</button>
                    <button
                        onClick={()=>{props.changeFilter('Completed')}}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
}