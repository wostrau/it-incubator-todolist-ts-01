const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
};

// reducer
export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
};

// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
};
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>;

