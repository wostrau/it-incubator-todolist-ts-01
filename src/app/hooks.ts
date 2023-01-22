import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatchType, AppRootStateType} from './store';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;