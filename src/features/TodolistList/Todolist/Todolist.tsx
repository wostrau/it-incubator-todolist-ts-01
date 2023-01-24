import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../api/todolists-api';
import {TodolistDomainType} from '../todolists-reducer';
import {useAppSelector} from '../../../app/hooks';
import {useActions} from '../../../app/store';
import {tasksActions, todolistsActions} from '../index';

type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {addTask, fetchTasks} = useActions(tasksActions);
    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todolistsActions);

    useEffect(() => {
        if (demo) return;
        fetchTasks({todolistId: props.todolist.id});
    }, [fetchTasks, props.todolist.id, demo]);

    const onAllClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'all'})
    }, [props,changeTodolistFilter]);
    const onActiveClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'active'})
    }, [props,changeTodolistFilter]);
    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'completed'})
    }, [props,changeTodolistFilter]);

    const removeTodolistHandler: MouseEventHandler = useCallback(() => {
        removeTodolist({id: props.todolist.id})
    }, [props,removeTodolist]);
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle({id: props.todolist.id, title: newTitle})
    }, [props,changeTodolistTitle]);

    const addTaskCallback = useCallback((title: string) => {
        addTask({todolistId: props.todolist.id, title: title});
    },[props, addTask]);

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
                        onChange={changeTodolistTitleHandler}
                    />
                    <IconButton
                        onClick={removeTodolistHandler}
                        disabled={props.todolist.entityStatus === 'loading'}
                    >
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    addItem={addTaskCallback}
                    disabled={props.todolist.entityStatus === 'loading'}
                />
                <div>
                    {tasksForTodolist.map(t => {
                        return (
                            <Task
                                key={t.id}
                                task={t}
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