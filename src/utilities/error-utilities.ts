import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {AxiosError} from 'axios';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: any, showError = true) => {
    if (showError) dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'some error'}));
    dispatch(setAppStatusAC({status: 'failed'}));
};

export const handleServerNetworkError = (error: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'some error'}));
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
};