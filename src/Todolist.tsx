import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, fetchTasksTC, removeTaskAC} from './state/tasks-reducer';
import {Task} from './Task';
import {TaskStatuses} from './api/todolists-api';
import {FilterValuesType} from './state/todolists-reducer';
import {useAppDispatch, useAppSelector} from './app/hooks';

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
       dispatch(fetchTasksTC(props.id));
    }, [dispatch, props.id]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch, props.id]);
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.id, taskId))
    }, [dispatch, props.id]);
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(props.id, taskId, status))
    }, [dispatch, props.id]);
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(props.id, taskId, newTitle));
    }, [dispatch, props.id]);
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props]);
    const removeTodolistHandler: MouseEventHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props]);
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props]);

    const tasks = useAppSelector(state => state.tasks[props.id]);
    let tasksForTodolist = tasks;
    if (props.filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.InProgress);
    if (props.filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);

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
                    {tasksForTodolist.map(t => {
                        return (
                            <Task
                                key={t.id}
                                id={t.id}
                                title={t.title}
                                status={t.status}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                            />
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
});