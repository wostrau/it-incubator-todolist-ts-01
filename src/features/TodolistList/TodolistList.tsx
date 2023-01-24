import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useNavigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {useActions, useAppSelector} from '../../app/store';
import {todolistsActions} from './index';

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const todolists = useAppSelector(state => state.todolists);
    const navigate = useNavigate();
    const {addTodolist, fetchTodolists} = useActions(todolistsActions);

    useEffect(() => {
        if (demo) return;
        if (!isLoggedIn) navigate('/login');
        fetchTodolists();
    }, [fetchTodolists, demo, isLoggedIn, navigate]);

    const addTodolistCallback = useCallback((title: string) => {
        addTodolist({title: title});
    },[addTodolist]);

    return (
        <Container fixed>
            <Grid
                container
                style={{padding: '20px'}}
            >
                <AddItemForm
                    addItem={addTodolistCallback}
                />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    demo={demo}
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};