import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    fetchTodolistsTC,
    FilterValuesType,
    TodolistDomainType, SetTodolistsActionType,
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './api/todolists-api';

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch]);
    const changeTodolistFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>News</Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    style={{padding: '20px'}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeFilter={changeTodolistFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
