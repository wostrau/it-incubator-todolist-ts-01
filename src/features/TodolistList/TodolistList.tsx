import React, {useCallback, useEffect} from 'react';
import {Container, Grid} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm';
import {useNavigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Authentication/selectors';
import {useAppSelector} from '../../app/store';
import {todolistsActions} from './index';
import {useActions, useAppDispatch} from '../../utilities/redux-utilities';

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const todolists = useAppSelector(state => state.todolists);
    const {fetchTodolistsTC, addTodolistTC} = useActions(todolistsActions);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (demo) return;
        if (!isLoggedIn) navigate('/login');
        fetchTodolistsTC();
    }, [demo, fetchTodolistsTC, isLoggedIn, navigate]);

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(addTodolistTC({title: title}));
        if (addTodolistTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0];
                helper.setError(errorMessage);
            } else helper.setError('SOME ERROR OCCURRED');
        } else helper.setTitle('');
    }, [dispatch, addTodolistTC]);

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
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll', height: '100vh'}}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <div style={{width: '350px'}}>
                                <Todolist
                                    demo={demo}
                                    todolist={tl}
                                />
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};