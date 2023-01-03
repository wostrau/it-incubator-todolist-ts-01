import React, {ChangeEvent, MouseEventHandler} from 'react';
import './App.css';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={props.title}
                        onChange={changeTodolistTitle}
                    />
                    <button
                        onClick={removeTodolistHandler}
                    >x
                    </button>
                </h3>
                <AddItemForm
                    addItem={addTask}
                />
                <ul>
                    {props.tasks.map(t => {
                        const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
                            props.removeTask(t.id, props.id)
                        };
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id);
                        };
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li
                                key={t.id}
                                className={t.isDone ? 'is-done' : ''}
                            >
                                <input
                                    type="checkbox"
                                    onChange={onChangeStatusHandler}
                                    checked={t.isDone}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleHandler}
                                />
                                <button
                                    onClick={onClickHandler}
                                >x
                                </button>
                            </li>
                        );
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