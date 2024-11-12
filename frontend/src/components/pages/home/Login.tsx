import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import axiosInstance from '../../../api/axiosInstance';
import HomeLayout from './HomeLayout';
import Form from '../../ui/Form';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin: handleBtnActionProp = async () => {
    const { email, password } = input;
    if (!email || !password) return;

    try {
      const { data } = await axiosInstance.post('/v1/auth/login', {
        email,
        password,
      });

      console.log(data.message);

      if (data.accessToken) {
        auth?.setToken(data.accessToken);
        navigate('/goal', { replace: true });
      }
    } catch (err: any) {
      console.error(err.response?.data?.message);
    }
  };

  const inputDataset = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      autoComplete: 'off',
      autoFocus: true,
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      autoComplete: 'off',
      required: true,
    },
  ];

  const buttonDataset = {
    label: 'Log in',
    action: handleLogin,
  };

  return (
    <HomeLayout>
      <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
        <h2 className='text-xl'>Log in</h2>

        <Form
          inputDataset={inputDataset}
          handleChange={handleInput}
          buttonDataset={buttonDataset}
        />

        <p>
          Don't have an account?{' '}
          <span className='text-blue-500'>
            <Link to='/signup'>Sign up</Link>
          </span>
        </p>
      </div>
    </HomeLayout>
  );
};

export default Login;
