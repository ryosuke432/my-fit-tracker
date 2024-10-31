import React from 'react';
import { useAuth } from './auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.setToken('');
    navigate('/', { replace: true });
  };
  return (
    <div className='flex flex-row justify-between items-center w-screen p-3'>
      <div className='hidden md:block h-full ml-12'>
        <Link to={'/mypage'}>
          <img
            alt='logo'
            src={logo}
            className='object-cover w-full h-16 rounded'
          />
        </Link>
      </div>
      <div className='grow flex flex-row justify-end items-center gap-x-5'>
        <h2 className='md:hidden'>MyFitTracker</h2>
        <div>dark</div>
        <div className='hidden md:block'>
          <Link to={'/mypage/profile'}>
            <div className='w-36 h-8 border rounded'>
              <div>(Member Name)</div>
            </div>
          </Link>
        </div>
        <button
          type='button'
          className='w-8 h-8 border rounded'
          onClick={handleLogout}
        >
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-log-out stroke-blue-500 hover:stroke-blue-700 hover:stroke-2'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' x2='9' y1='12' y2='12' />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
