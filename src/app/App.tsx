import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {useAppDispatch, useAppSelector} from './hooks';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {initializeAppTC} from './app-reducer';
import {logoutTC} from '../features/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
    const status = useAppSelector(state => state.app.status);
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }

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
                    {isLoggedIn && <Button
                        color={'inherit'}
                        onClick={logoutHandler}
                    >LOGOUT</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Routes>
                <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </div>
    );
};
