import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {useAppDispatch, useAppSelector} from './hooks';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Auth/Login';
import {initializeAppTC} from './app-reducer';
import {logoutTC} from '../features/Auth/auth-reducer';
import {authSelectors} from '../features/Auth';
import {appSelectors} from './index';

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
    const status = useAppSelector(appSelectors.selectStatus);
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized);
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!demo) dispatch(initializeAppTC());
    }, [dispatch, demo]);

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
