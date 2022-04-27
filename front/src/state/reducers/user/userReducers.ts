import { UserActionType } from "../../action-types/user/user-action-types";
import { Action } from '../../actions/user';

interface UserState {
    loading: boolean;
    error: string | null;
    userInfo?: any;
};

const initialState = {
    loading: false,
    error: null,
    userInfo: []
}

export const userLoginReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case UserActionType.USER_LOGIN_REQUEST:
            return {
                loading: true,
                userInfo: null,
                error: null
            };
        case UserActionType.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                error: null
            };
        case UserActionType.USER_LOGIN_FAIL:
            return {
                loading: false,
                userInfo: null,
                error: action.payload
            };
        case UserActionType.USER_LOGOUT:
            return {
                loading: false,
                userInfo: null,
                error: null
            }

        default:
            return state;
    }
}

export const userRegisterReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
        case UserActionType.USER_REGISTER_REQUEST:
            return {
                loading: true,
                userInfo: null,
                error: null
            };
        case UserActionType.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                error: null
            };
        case UserActionType.USER_REGISTER_FAIL:
            return {
                loading: false,
                userInfo: null,
                error: action.payload
            };
       
        default:
            return state;
    }
}
