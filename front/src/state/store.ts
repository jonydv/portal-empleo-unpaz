import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";

export interface AppState {
    userLogin?: any,
    userRegister?: any,
  };


const userInfoFromStorage = !!localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')!) : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage, loading: false, error: null},
};

export const store = createStore(
    reducers, initialState, applyMiddleware(thunk)
);