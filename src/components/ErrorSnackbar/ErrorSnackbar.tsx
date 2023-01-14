import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setAppErrorAC} from '../../app/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error);
    const dispatch = useAppDispatch();
    const isOpen = error !== null;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(setAppErrorAC(null));
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar
                open={isOpen}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{width: '100%'}}
                >{error}
                </Alert>
            </Snackbar>
        </Stack>
    );
};