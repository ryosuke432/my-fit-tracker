import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItem = [
    { url: '/metrics', name: 'Metrics' },
    { url: '/premium/lessons', name: 'Lessons' },
  ];

  const NavItem = ({
    navItem,
  }: {
    navItem: { url: string; name: string; icon?: string }[];
  }) => {
    return (
      <>
        {navItem.map((item) => {
          return (
            <NavLink
              to={item.url}
              className='w-full h-8 rounded-full'
            >
              {item.name}
            </NavLink>
          );
        })}
      </>
    );
  };
  return (
    <div className='hidden md:flex flex-col justify-evenly items-center p-2 gap-y-5 w-36 lg:w-48 h-full overflow-auto scroll-smooth rounded'>
      <div className='grow flex flex-col justify-start items-center w-5/6 gap-y-2'>
        <NavItem navItem={navItem} />
      </div>
      <div className='text-black bg-amber-100 w-5/6 h-8 rounded-full'>Upgrade</div>
    </div>
  );
};

export default Sidebar;
