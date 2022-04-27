import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from '../state/action-creators';
import { register } from '../state/action-creators/user/user-action';

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators({login, logout, register}, dispatch);
};