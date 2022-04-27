import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navigation from './components/Navigation/Navigation';
import { store } from './state/store';

const App: React.FC = () => {
  return (
  <Provider store={store}>
    <div className="App">
      
      <BrowserRouter>
      <Navigation />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
