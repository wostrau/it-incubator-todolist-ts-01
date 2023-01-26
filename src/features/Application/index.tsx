import * as appSelectors from '../../app/selectors';
import {slice, appAsyncActions, RequestStatusType as T1, AppInitialStateType as T2} from './application-reducer';


const appActions = {...slice.actions, ...appAsyncActions};
const appReducer = slice.reducer;
export type RequestStatusType = T1;
export type AppInitialStateType = T2;
export {
    appSelectors,
    appActions,
    appReducer,
};