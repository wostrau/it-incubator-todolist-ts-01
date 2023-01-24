import * as authSelectors from './selectors';
import {Login} from './Login';
import {authAsyncActions, slice} from './auth-reducer';

const authActions = {...authAsyncActions, ...slice.actions}

export {
    authSelectors,
    authActions,
    Login
}