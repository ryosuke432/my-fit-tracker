import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';

const Mypage = () => {
  const [profile, setProfile] = useState<MemberInterface>({
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    mobile: 0,
    bodyWeight: 0,
    isPremium: false,
  });

  const fetchProfile = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get('/v1/member/profile');
      if (status !== 200) return;
      setProfile(data.member);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className='flex flex-col justify-between items-center w-full min-h-screen md:h-screen overflow-hidden'>
      <Header profile={profile} />
      <div className='flex flex-row justify-between items-center p-3 md:gap-x-5 w-full h-[calc(100vh-32px-80px)]'>
        <Sidebar />
        <main className='w-full md:w-[calc(100vw-192px)] h-full overflow-hidden'>
          <Outlet context={[profile, setProfile]} />
        </main>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Mypage;

export const useProfile = () => {
  return useOutletContext<
    [MemberInterface, React.Dispatch<React.SetStateAction<MemberInterface>>]
  >();
};
