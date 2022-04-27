import { UserActionType } from '../../action-types/user/user-action-types';

export interface UserLoginAction {
    type: UserActionType.USER_LOGIN_REQUEST;
    
};

export interface UserLoginSuccessAction {
    type: UserActionType.USER_LOGIN_SUCCESS;
    payload: any;
};

export interface UserLoginFailAction {
    type: UserActionType.USER_LOGIN_FAIL;
    payload: any;
};

export interface UserLogoutAction {
    type: UserActionType.USER_LOGOUT;

};

export interface UserDetailsResetAction {
    type: UserActionType.USER_DETAILS_RESET;

};

export interface UserRegisterAction {
    type: UserActionType.USER_REGISTER_REQUEST;

};

export interface UserRegisterSuccessAction {
    type: UserActionType.USER_REGISTER_SUCCESS;
    payload: any;
};

export interface UserRegisterFailAction {
    type: UserActionType.USER_REGISTER_FAIL;
    payload: any;
};
export type Action = 
UserLoginAction 
| UserLoginSuccessAction 
| UserLoginFailAction 
| UserLogoutAction 
| UserDetailsResetAction
| UserRegisterAction
| UserRegisterSuccessAction
| UserRegisterFailAction
;