import * as appSelectors from './selectors';
import {appAsyncActions} from './app-reducer';

const appActions = {
    ...appAsyncActions
};

export {
    appSelectors,
    appActions
};