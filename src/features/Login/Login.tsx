import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginTC} from './auth-reducer';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
        validate: values => {
            if (!values.email) return {email: 'Email is required'};
            if (!values.password) return {password: 'Password is required'};
        },
    });

    if (isLoggedIn) navigate('/');

    return (
        <Grid container={true} justifyContent={'center'}>
            <Grid item xs={2}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered <a
                                href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}
                                rel="noreferrer nofollow noopener"
                            >here</a>
                            </p>
                            <p>
                                or use common test account credentials:
                            </p>
                            <p>
                                Email: free@samuraijs.com
                            </p>
                            <p>
                                Password: free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                variant={'standard'}
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField
                                variant={'standard'}
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label="Remember me"
                                control={<Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                            >Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
};