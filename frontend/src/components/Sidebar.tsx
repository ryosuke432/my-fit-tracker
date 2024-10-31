import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col justify-evenly items-center p-2 gap-y-5 w-36 lg:w-48 h-full border-2 border-solid border-blue-700 rounded'>
      <div className='grow flex flex-col justify-between items-center text-center w-full rounded gap-y-3'>
        <NavLink to={'/mypage/metrics'}>Metrics</NavLink>
      </div>
      <div className='w-full h-10 p-2 m-1 rounded text-lg bg-red-100 text-center'>
        Upgrade
      </div>
    </div>
  );
};

export default Sidebar;
