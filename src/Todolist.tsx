import React, {ChangeEvent, MouseEventHandler, useCallback} from 'react';
import './App.css';
import {FilterValuesType, TaskType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist was called');

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

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const removeTodolistHandler: MouseEventHandler = () => props.removeTodolist(props.id);
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle);

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
                        const onClickHandler = () => {
                            removeTask(t.id);
                        };
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, event.currentTarget.checked);
                        };
                        const onChangeTitleHandler = (newTitle: string) => {
                            changeTaskTitle(t.id, newTitle);
                        };

                        return (
                            <div
                                style={t.isDone ? {opacity: '0.5'} : {}}
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
});