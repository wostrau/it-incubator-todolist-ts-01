import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from './Task/tasks-reducer';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../api/todolists-api';
import {FilterValuesType, TodolistDomainType} from './todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';


type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) return;
        dispatch(fetchTasksTC({todolistId: props.todolist.id}));
    }, [dispatch, props.todolist.id, demo]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC({todolistId: props.todolist.id, title: title}))
    }, [dispatch, props.todolist.id]);
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskTC({todolistId: props.todolist.id, taskId: taskId}));
    }, [dispatch, props.todolist.id]);
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(props.todolist.id, taskId, {status: status}))
    }, [dispatch, props.todolist.id]);
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(props.todolist.id, taskId, {title: newTitle}));
    }, [dispatch, props.todolist.id]);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props]);
    const removeTodolistHandler: MouseEventHandler = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props]);
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props]);

    const tasks = useAppSelector(state => state.tasks[props.todolist.id]);
    let tasksForTodolist = tasks;
    if (props.todolist.filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.InProgress);
    if (props.todolist.filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={props.todolist.title}
                        onChange={changeTodolistTitle}
                    />
                    <IconButton
                        onClick={removeTodolistHandler}
                        disabled={props.todolist.entityStatus === 'loading'}
                    >
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    addItem={addTask}
                    disabled={props.todolist.entityStatus === 'loading'}
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
                        variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                    >All
                    </Button>
                    <Button
                        color={'primary'}
                        variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                    >Active
                    </Button>
                    <Button
                        color={'primary'}
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    );
});