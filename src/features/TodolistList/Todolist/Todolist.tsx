import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, Chip, Paper} from '@mui/material';
import {Task} from './Task/Task';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {useAppSelector} from '../../../app/store';
import {tasksActions, todolistsActions} from '../index';
import {useActions, useAppDispatch} from '../../../utilities/redux-utilities';
import {TaskStatuses} from '../../../api/types';

type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {fetchTasksTC, addTaskTC} = useActions(tasksActions);
    const {changeTodolistFilterAC, removeTodolistTC, changeTodolistTitleTC} = useActions(todolistsActions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) return;
        fetchTasksTC({todolistId: props.todolist.id});
    }, [fetchTasksTC, props.todolist.id, demo]);

    const removeTodolistHandler: MouseEventHandler = useCallback(() => {
        removeTodolistTC({id: props.todolist.id})
    }, [props, removeTodolistTC]);
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: newTitle})
    }, [props, changeTodolistTitleTC]);

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(addTaskTC({todolistId: props.todolist.id, title: title}));
        if (addTaskTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0];
                helper.setError(errorMessage);
            } else helper.setError('SOME ERROR OCCURRED');
        } else helper.setTitle('');
    }, [dispatch, props]);

    const tasks = useAppSelector(state => state.tasks[props.todolist.id]);
    let tasksForTodolist = tasks;
    if (props.todolist.filter === 'active') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New || t.status === TaskStatuses.InProgress);
    if (props.todolist.filter === 'completed') tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilterAC({id: props.todolist.id, filter: filter})
    }, [props, changeTodolistFilterAC]);
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
            <Paper style={{position: 'relative', padding: '10px'}}>
                <Chip
                    size={'small'}
                    label={<text style={{color: 'lightsalmon'}}>REM</text>}
                    disabled={props.todolist.entityStatus === 'loading'}
                    onDelete={removeTodolistHandler}
                    style={{position: 'absolute', right: '10px', top: '10px'}}
                />
                {/*standard 'delete' icon from Material UI (ready to use)*/}
                {/*<IconButton
                    onClick={removeTodolistHandler}
                    disabled={props.todolist.entityStatus === 'loading'}
                    style={{position: 'absolute', right: '5px', top: '5px'}}
                >
                    <Delete/>
                </IconButton>*/}
                <h3>
                    <EditableSpan
                        title={props.todolist.title}
                        onChange={changeTodolistTitleHandler}
                    />
                </h3>
                <AddItemForm
                    addItem={addTaskCallback}
                    disabled={props.todolist.entityStatus === 'loading'}
                />
                <div>
                    {tasksForTodolist.map(t => <Task key={t.id} task={t}/>)}
                    {!tasksForTodolist.length && <div
                        style={{opacity: '0.5', padding: '10px', color: 'lightsalmon'}}
                    >NO TASKS YET</div>}
                </div>
                <div style={{padding: '10px'}}>
                    {renderFilterButton('all')}
                    {renderFilterButton('active')}
                    {renderFilterButton('completed')}
                </div>
            </Paper>
        </div>
    );
});