import React, { useState } from 'react';
import Button from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = input;
    if (!email || !password) return;

    try {
      const { data } = await axiosInstance.post('/v1/auth/login', {
        email,
        password,
      });

      console.log(data.message)

      if (data.accessToken) {
        auth?.setToken(data.accessToken);
        navigate('/mypage', { replace: true });
      }
    } catch (err: any) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
      <h2 className='text-xl'>Log in</h2>

      <form className='flex flex-col gap-y-3 w-full'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='off'
          autoFocus
          onChange={handleInput}
          required
        />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleInput}
          required
        />

        <Button label='Log in' action={handleSubmit} />
      </form>

      <p>
        Don't have an account?{' '}
        <span className='text-blue-500'>
          <Link to='/signup'>Sign up</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
