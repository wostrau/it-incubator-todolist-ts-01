import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TodolistList} from '../features/TodolistList/TodolistList';


export const App = () => {
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
            <TodolistList/>
        </div>
    );
};
