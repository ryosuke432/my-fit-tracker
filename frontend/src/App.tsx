import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Mypage from './components/Mypage';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Log in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
      </nav>
      <AuthProvider>
        <Routes>
          <Route index element={<div>Home</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/mypage' element={<Mypage />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
