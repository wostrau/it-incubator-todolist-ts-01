import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
import {appActions} from '../../features/Application';
import {useActions, useAppDispatch} from '../../utilities/redux-utilities';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error);
    const isOpen = error !== null;
    const {setAppErrorAC} = useActions(appActions);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setAppErrorAC({error: null});
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