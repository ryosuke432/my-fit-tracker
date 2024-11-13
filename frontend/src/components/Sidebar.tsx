import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Flag, Gauge, MapPinned, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col justify-between items-center p-2 gap-y-5 w-36 lg:w-48 h-full overflow-auto scroll-smooth rounded'>
      <div className='grow flex flex-col justify-start items-center w-5/6 gap-y-3'>
        <NavLink
          to={'/goal'}
          className='w-full h-8 text-sm md:text-md xl:text-lg flex flex-row justify-start items-center gap-x-2'
        >
          <Flag size={20} />
          <span>Goal</span>
        </NavLink>
        <NavLink
          to={'/metrics'}
          className='w-full h-8 text-sm md:text-md xl:text-lg flex flex-row justify-start items-center gap-x-2'
        >
          <Gauge size={20} />
          <span>Metrics</span>
        </NavLink>
        <NavLink
          to={'/community'}
          className='w-full h-8 text-sm md:text-md xl:text-lg flex flex-row justify-start items-center gap-x-2'
        >
          <Users size={20} />
          <span>Community</span>
        </NavLink>
        <NavLink
          to={'/premium/lessons'}
          className='w-full h-8 text-sm md:text-md xl:text-lg flex flex-row justify-start items-center gap-x-2'
        >
          <BookOpen size={20} />
          <span>Lessons</span>
        </NavLink>
        <NavLink
          to={'/premium/my-routes'}
          className='w-full h-8 text-sm md:text-md xl:text-lg flex flex-row justify-start items-center gap-x-2'
        >
          <MapPinned size={20} />
          <span>My Routes</span>
        </NavLink>
      </div>
      <div className='text-black bg-amber-100 w-5/6 h-8 rounded-full'>
        Upgrade
      </div>
    </div>
  );
};

export default Sidebar;
