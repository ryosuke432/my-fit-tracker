import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Mypage = () => {
  const [profile, setProfile] = useState<MemberInterface>({
    f_name: '',
    l_name: '',
    full_name: '',
    email: '',
    mobile: 0,
    body_weight: 0,
    is_premium: false,
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
    <div className='flex flex-col justify-between items-center gap-y-2 w-screen h-screen'>
      <Header profile={profile} />
      <div className='grow flex flex-row justify-between items-center m-2 p-3 gap-x-5 w-full'>
        <Sidebar />
        <main className='grow h-full border-2 border-blue-700 rounded'>
          <Outlet context={[profile, setProfile]} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;

export const useProfile = () => {
  return useOutletContext<[MemberInterface, React.Dispatch<React.SetStateAction<MemberInterface>>]>();
};
