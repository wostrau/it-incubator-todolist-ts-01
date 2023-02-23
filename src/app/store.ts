import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {AppRootStateType} from '../utilities/types';
import {rootReducer} from './rootReducer';


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default;
        store.replaceReducer(newRootReducer);
    })
}

