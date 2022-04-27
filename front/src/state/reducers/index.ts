import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./user/userReducers";


const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;