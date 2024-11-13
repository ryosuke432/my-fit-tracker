import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Flag, Gauge, MapPinned, Users } from 'lucide-react';

const MobileBottomNav = () => {
  return (
    <div className='md:hidden fixed bottom-0 z-10 w-full h-12 border-t border-slate-200 bg-white flex flex-row justify-evenly items-center gap-x-2 py-1'>
      <NavLink to={'/goal'} className='flex flex-col justify-center items-center'>
        <Flag size={20} />
      </NavLink>
      <NavLink
        to={'/metrics'}
        className='flex flex-col justify-center items-center'
      >
        <Gauge size={20} />
      </NavLink>
      <NavLink
        to={'/community'}
        className='flex flex-col justify-center items-center'
      >
        <Users size={20} />
      </NavLink>
      <NavLink
        to={'/premium/lessons'}
        className='flex flex-col justify-center items-center'
      >
        <BookOpen size={20} />
      </NavLink>
      <NavLink
        to={'/premium/my-routes'}
        className='flex flex-col justify-center items-center'
      >
        <MapPinned size={20} />
      </NavLink>
    </div>
  );
};

export default MobileBottomNav;
