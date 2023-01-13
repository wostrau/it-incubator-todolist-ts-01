import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
} from '../features/Todolist/todolists-reducer';
import {TaskType} from '../api/todolists-api';
import {useAppDispatch, useAppSelector} from './hooks';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolists = useAppSelector(state => state.todolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);
    // filter changes in REDUX / no server response with 'filter' property!
    const changeTodolistFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch]);

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                <LinearProgress/>
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

export default App;
