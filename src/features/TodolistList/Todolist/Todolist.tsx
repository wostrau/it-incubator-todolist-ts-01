import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../api/todolists-api';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {useActions, useAppSelector} from '../../../app/store';
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

    const removeTodolistHandler: MouseEventHandler = useCallback(() => {
        removeTodolist({id: props.todolist.id})
    }, [props, removeTodolist]);
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle({id: props.todolist.id, title: newTitle})
    }, [props, changeTodolistTitle]);

    const addTaskCallback = useCallback((title: string) => {
        addTask({todolistId: props.todolist.id, title: title});
    }, [props, addTask]);

    const tasks = useAppSelector(state => state.tasks[props.todolist.id]);
    let tasksForTodolist = tasks;
    if (props.todolist.filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.InProgress);
    if (props.todolist.filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilter({id: props.todolist.id, filter: filter})
    }, [props, changeTodolistFilter]);
    const renderFilterButton = (filter: FilterValuesType) => {
        return (
            <Button
                style={{margin: '5px'}}
                color={'primary'}
                variant={props.todolist.filter === filter ? 'contained' : 'text'}
                onClick={() => onFilterButtonClickHandler(filter)}
            >{filter.toUpperCase()}
            </Button>
        );
    };

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
                    {tasksForTodolist.map(t => <Task key={t.id} task={t}/>)}
                </div>
                <div style={{padding: '10px'}}>
                    {renderFilterButton('all')}
                    {renderFilterButton('active')}
                    {renderFilterButton('completed')}
                </div>
            </div>
        </div>
    );
});