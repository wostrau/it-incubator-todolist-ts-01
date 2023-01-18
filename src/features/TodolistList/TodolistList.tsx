import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from './Todolist/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useNavigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const todolists = useAppSelector(state => state.todolists);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) return;
        if (!isLoggedIn) navigate('/login');
        dispatch(fetchTodolistsTC());
    }, [dispatch, demo, isLoggedIn, navigate]);

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
                                    demo={demo}
                                    todolist={tl}
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
    );
};