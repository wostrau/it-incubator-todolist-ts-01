import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TodolistList} from '../features/TodolistList';
import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from './store';
import {authActions, authSelectors, Login} from '../features/Authentication';
import {appActions, appSelectors} from '../features/Application';
import {useActions} from '../utilities/redux-utilities';

type PropsType = {};

export const App = (props: PropsType) => {
    const {initializeAppTC} = useActions(appActions);
    const {logoutTC} = useActions(authActions);
    const status = useAppSelector(appSelectors.selectStatus);
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized);
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

    useEffect(() => {
        if (!isInitialized) {
            initializeAppTC();
        }
    }, [initializeAppTC]);

    const onClickHandler = useCallback(() => logoutTC(), [logoutTC])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>);
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
                        onClick={onClickHandler}
                    >LOGOUT</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Routes>
                <Route path={'/'} element={<TodolistList demo={false}/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </div>
    );
};
