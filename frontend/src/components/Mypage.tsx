import React from 'react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Mypage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.setToken('');
    navigate('/', { replace: true });
  };

  return (
    <>
      <div>Mypage</div>
      <Button label='Log out' action={handleLogout} />
    </>
  );
};

export default Mypage;
