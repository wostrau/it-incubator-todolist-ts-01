import {appActions} from '../features/Application';
import {AxiosError} from 'axios';
import {ResponseType} from '../api/types';


// original type BaseThunkAPI from redux-toolkit
type ThunkAPI = {
    dispatch: (action: any) => any,
    rejectWithValue: Function,
};

const {setAppErrorAC, setAppStatusAC} = appActions;
export const handleServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPI, showError = true) => {
    if (showError) thunkAPI.dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'some error'}));
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
};

export const handleServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPI, showError = true) => {
    if (showError) thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'some error'}));
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
};







