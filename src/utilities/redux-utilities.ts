import {useDispatch} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {AppDispatchType} from './types';


export const useAppDispatch = () => useDispatch<AppDispatchType>();
export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();
    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch]);
}