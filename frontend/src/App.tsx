import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Log in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
      </nav>

      <Routes>
        <Route index element={<div>Home</div>} />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
