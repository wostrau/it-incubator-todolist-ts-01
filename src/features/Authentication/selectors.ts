import {AppRootStateType} from '../../utilities/types';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;