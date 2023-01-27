import {createAction} from '@reduxjs/toolkit';
import {RequestStatusType} from '../Application/application-reducer';


const setAppStatusAC = createAction<{ status: RequestStatusType }>('application/setAppStatusAC');
const setAppErrorAC = createAction<{ error: string | null }>('application/setAppErrorAC');

export const appActions = {setAppStatusAC, setAppErrorAC};