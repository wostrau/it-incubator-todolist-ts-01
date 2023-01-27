import React, {useEffect} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {FormikHelpers, useFormik} from 'formik';
import {useAppSelector} from '../../app/store';
import {useNavigate} from 'react-router-dom';
import {authActions, authSelectors} from './index';
import {useAppDispatch} from '../../utilities/redux-utilities';


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

    useEffect(()=>{
        if (isLoggedIn) navigate('/');
    },[isLoggedIn, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const resultAction = await dispatch(authActions.loginTC(values));
            if (authActions.loginTC.rejected.match(resultAction)) {
                if (resultAction.payload?.fieldsErrors?.length) {
                    const error = resultAction.payload?.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.error);
                }
            }
        },
        validate: values => {
            if (!values.email) return {email: 'Email is required'};
            if (!values.password) return {password: 'Password is required'};
        },
    });

    return (
        <Grid container={true} justifyContent={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered <a
                                    href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'}
                                    rel="noreferrer nofollow noopener"
                                >here</a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
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