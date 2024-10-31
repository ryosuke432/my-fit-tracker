import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className='flex flex-row justify-between items-center py-2 px-5 mb-5'>
        <NavLink to='/'>Home</NavLink>
        <div className='flex flex-row justify-evenly items-center gap-x-5'>
          <NavLink to='/login'>Log in</NavLink>
          <NavLink to='/signup'>Sign up</NavLink>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default HomeLayout;
