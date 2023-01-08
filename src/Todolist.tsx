import React, {MouseEventHandler, useCallback} from 'react';
import './App.css';
import {FilterValuesType, TaskType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id]);

    const dispatch = useDispatch();
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch, props.id]);
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.id, taskId))
    }, [dispatch, props.id]);
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.id, taskId, isDone))
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

    let tasksForTodolist = tasks;
    if (props.filter === 'active') tasksForTodolist = tasks.filter(t => !t.isDone);
    if (props.filter === 'completed') tasksForTodolist = tasks.filter(t => t.isDone);

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
                                isDone={t.isDone}
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