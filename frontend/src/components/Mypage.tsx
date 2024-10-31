import React from 'react';
import axiosInstance from '../api/axiosInstance';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export const fetchProfile = async () => {
  try {
    const { data, status } = await axiosInstance.get('/v1/member/profile');
    console.log(status, data);
    if (status !== 200) return;
    return data;
  } catch (err) {
    console.error(err);
  }
};

const Mypage = () => {
  return (
    <div className='flex flex-col justify-between items-center gap-y-2 w-screen h-screen'>
      <Header />
      <div className='grow flex flex-row justify-between items-center m-2 p-3 gap-x-5 w-full'>
        <Sidebar />
        <main className='grow h-full border-2 border-blue-700 rounded'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
