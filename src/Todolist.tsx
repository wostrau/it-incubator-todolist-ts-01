import React, {ChangeEvent, MouseEventHandler} from 'react';
import './App.css';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

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
    const removeTodolistHandler = () => props.removeTodolist(props.id);

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle);
    const addTask = (title: string) => props.addTask(title, props.id);

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={props.title}
                        onChange={changeTodolistTitle}
                    />
                    <IconButton
                        onClick={removeTodolistHandler}
                    >
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    addItem={addTask}
                />
                <div>
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
                            <div
                                key={t.id}
                            >
                                <Checkbox
                                    onChange={onChangeStatusHandler}
                                    checked={t.isDone}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleHandler}
                                />
                                <IconButton
                                    onClick={onClickHandler}
                                >
                                    <Delete/>
                                </IconButton>
                            </div>
                        );
                    })}
                </div>
                <div style={{padding: '10px'}}>
                    <Button
                        color={'primary'}
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                    >All
                    </Button>
                    <Button
                        color={'primary'}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                    >Active
                    </Button>
                    <Button
                        color={'primary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};