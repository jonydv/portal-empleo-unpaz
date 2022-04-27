import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Register.scss';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Register: React.FC = () => {

    const [name, setName ] = useState('');
    const [surname, setSurname ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');
    const [redirect, setRedirect ] = useState(false);
    const { register } = useActions();
    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log({name, surname, email, password, confirmPassword})
        const response = await axios.post('http://localhost:3300/users', {
            name, surname, email, password
        });
        setRedirect(true);
        console.log(response);
    }
    useEffect(() => {
        if(userInfo != null){
            setRedirect(true);
        }
    }, [userInfo]);
    
    if(redirect){
        return <Navigate to="/"/>
    }
    return(
        <form className="form container" onSubmit={submit}>
            <h1 className="mb-5">Registrarse</h1>
            <div className="mb-3">
                <label className="form-label">Nombre: </label>
                <input type="text" className="form-control" placeholder="Nombre" 
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Apellido: </label>
                <input type="text" className="form-control" placeholder="Apellido" 
                    onChange={e => setSurname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Correo electronico: </label>
                <input type="text" className="form-control" placeholder="correo electronico" 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Contraseña</label>
                <input type="password" className="form-control" placeholder="Contraseña" 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control" placeholder="Confirmar contraseña" 
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-info">Registrarse</button>
            </div>
        </form>
    );
};

export default Register;