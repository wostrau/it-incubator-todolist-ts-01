import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from '../../../app/store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../utilities/error-utilities';

// initial state
const initialSate: TodolistDomainType[] = [];

// reducer
export const todolistsReducer = (state: TodolistDomainType[] = initialSate, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
        default:
            return state;
    }
};

// action creators
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists: todolists} as const;
};
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const;
};
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist: todolist} as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const;
};
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: id, status: status} as const;
};

// thunk creators
export const fetchTodolistsTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTodolists()
        .then(r => {
                dispatch(setTodolistsAC(r.data));
                dispatch(setAppStatusAC('succeeded'))
            })
        .catch(error => handleServerNetworkError(error, dispatch));
};
export const removeTodolistTC = (id: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistsAPI.deleteTodolist(id)
        .then(r => {
            dispatch(removeTodolistAC(id))
            dispatch(setAppStatusAC('succeeded'));
        });
};
export const addTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTodolist(title)
        .then(r => {
            if (r.data.resultCode === 0) {
                dispatch(addTodolistAC(r.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                if (r.data.messages.length) {
                    dispatch(setAppErrorAC(r.data.messages[0]));
                } else dispatch(setAppErrorAC('some error'));
                dispatch(setAppStatusAC('failed'));
            }
        });
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => dispatch => {
    todolistsAPI.updateTodolistTitle(id, title)
        .then(r => dispatch(changeTodolistTitleAC(id, title)))
};

// types
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type addTodolistActionType = ReturnType<typeof addTodolistAC>;
export type TodolistsActionsType =
    | setTodolistsActionType
    | removeTodolistActionType
    | addTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
};