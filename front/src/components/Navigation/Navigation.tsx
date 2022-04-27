import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './Navigation.scss';

const Navigation: React.FC = () => {

    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    const { logout } = useActions();
    
    const logoutHandler = () => {
        logout();
    }
    
    return(
        // <header className="header">
        //     <div className="header-container">
        //         <div className="header-container__logo">
        //             <img src="https://www.bumeran.com.ar/candidate/static/media/bumeran.296e6bc2.svg" alt="logo" />
        //         </div>
        //         <div className="header-container__nav">
        //             <ul className="header-container__nav-items">
        //                 <li className="header-container__nav-items-item">
        //                     <button className="header-container__nav-items-item-button">Jovenes Profesionales</button>
        //                 </li>
        //                 <li className="header-container__nav-items-item">
        //                     <a className="header-container__nav-items-item-link">Blog</a>
        //                 </li>
        //                 <li className="header-container__nav-items-item">
        //                     <a className="header-container__nav-items-item-link">Soy Empresa</a>
        //                 </li>
        //                 <li className="header-container__nav-items-item">
        //                     <button className="header-container__nav-items-item-button">Publicar Gratis</button>
        //                 </li>
        //                 <li className="header-container__nav-items-item">
        //                     <button className="header-container__nav-items-item-button">Ingresar</button>
        //                 </li>
        //             </ul>
                    

        //         </div>
        //     </div>

        // </header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" >Home</NavLink>
                </li>
            </ul>
            {!userInfo ?
            (<>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >Iniciar Sesión</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >Registrarse</NavLink>
                </li>
            </ul></>)
            :(
            <>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link">Bienvenido {userInfo.user.name}</a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" onClick={logoutHandler}>Cerrar Sesión</a>
                </li>
            </ul>
            </>
            )
            }
        </nav>
    );
}

export default Navigation;