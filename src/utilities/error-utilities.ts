import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: any) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}));
    } else dispatch(setAppErrorAC({error: 'some error'}));
    dispatch(setAppStatusAC({status: 'failed'}));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: any) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'some error'}));
    dispatch(setAppStatusAC({status: 'failed'}));
};