import * as authSelectors from './selectors';
import {Login} from './Login';
import {authAsyncActions, slice} from './authentication-reducer';

const authActions = {...authAsyncActions, ...slice.actions};
const authReducer = slice.reducer;

export {
    authSelectors,
    authActions,
    authReducer,
    Login
};