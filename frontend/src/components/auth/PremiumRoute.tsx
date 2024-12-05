import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../Mypage';

const PremiumRoute = () => {
  const [profile, setProfile] = useProfile();

  if (profile.isPremium === false)
    return <div>This page is only for premium users</div>;

  return <Outlet />;
};

export default PremiumRoute;
