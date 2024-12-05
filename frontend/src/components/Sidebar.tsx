import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Flag, Gauge, MapPinned, Users } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const Sidebar = () => {
  return (
    <div className='hidden md:flex md:flex-col md:justify-between md:items-center md:p-2 md:gap-y-5 md:w-48 md:h-full md:overflow-auto md:scroll-smooth md:rounded'>
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

      <button
        type='button'
        className='text-black bg-amber-100 w-5/6 h-8 rounded-full hover:cursor-pointer'
        onClick={async () => {
          try {
            await axiosInstance.patch('/v1/member/profile/upgrade');
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Upgrade
      </button>
    </div>
  );
};

export default Sidebar;
