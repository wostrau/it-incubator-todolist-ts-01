import {store} from '../app/store';
import {FieldErrorType} from '../api/types';
import {rootReducer} from '../app/rootReducer';

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;
export type AppDispatchType = typeof store.dispatch;
export type ThunkErrorType = {
    rejectValue: {
        errors: Array<string>,
        fieldsErrors?: Array<FieldErrorType>
    }
};