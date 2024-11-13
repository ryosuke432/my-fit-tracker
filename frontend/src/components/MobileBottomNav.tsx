import { BookPlus, Gauge } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const MobileBottomNav = () => {
  return (
    <div className='md:hidden fixed bottom-0 z-10 w-full h-12 border-t border-slate-200 bg-white flex flex-row justify-evenly items-center gap-x-2 pt-2'>
      <Link
        to={'/metrics'}
        className='flex flex-col justify-center items-center'
      >
        <Gauge size={20} />
        <small>Metrics</small>
      </Link>
      <Link
        to={'/premium/lessons'}
        className='flex flex-col justify-center items-center'
      >
        <BookPlus size={20} />
        <small>Lessons</small>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
