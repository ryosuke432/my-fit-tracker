import React from 'react';
import { useAuth } from './auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import { LogOut, Moon } from 'lucide-react';

const Header = ({ profile }: { profile: MemberInterface }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.setToken('');
    navigate('/', { replace: true });
  };
  return (
    <div className='flex flex-row justify-between items-center w-full md:w-11/12 p-3'>
      <Link to={'/goal'} className='flex flex-row justify-start items-center gap-x-2'>
        <img
          alt='logo'
          src={logo}
          className='object-cover w-14 h-14 rounded md:w-18 md:h-18'
        />
        <h2 className='hidden md:block font-bold text-xl'>MyFitTracker</h2>
      </Link>
      <div className='grow flex flex-row justify-end items-center gap-x-1 md:gap-x-5'>
        <Moon
          size={24}
          className='w-8 h-8 p-2 rounded-full fill-white hover:cursor-pointer hover:shadow-md dark:hover:shadow-slate-100 dark:fill-yellow-100 dark:bg-slate-400 '
        />
        <Link
          to={'/mypage/profile'}
          className='w-8 h-8 bg-slate-100 rounded-full hover:shadow-md'
        >
          {profile.f_name[0]}
          {profile.l_name[0]}
        </Link>
        <button
          type='button'
          className='w-8 md:w-24 h-8 rounded-full hover:shadow-md hover:bg-emerald-200'
          onClick={handleLogout}
        >
          <div className='flex flex-row justify-center items-center gap-x-1'>
            <p className='hidden md:block'>Logout</p>
            <LogOut size={20} strokeWidth={1} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
