import React from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {useAppSelector} from './hooks';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
    const status = useAppSelector(state => state.app.status);
    const initialized = useAppSelector(state => state.app.);

    if (!initialized) {
        return (
            <div style={{position: 'absolute', top: '30%', textAlign: 'center', width: '100%'}}>
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
                    <Button color={'inherit'}>Login</Button>
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
