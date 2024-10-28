import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import axiosInstance from '../api/axiosInstance';

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    f_name: '',
    l_name: '',
    email: '',
    mobile: '',
    password: '',
    body_weight: '',
  });

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { f_name, l_name, email, mobile, password, body_weight } = input;
    if (!f_name || !l_name || !email || !mobile || !password) return;
    try {
      const { data } = await axiosInstance.post('/v1/auth/signup', {
        f_name,
        l_name,
        email,
        mobile,
        password,
        body_weight,
      });

      console.log(data.message);

      navigate('/login');

      setInput({
        f_name: '',
        l_name: '',
        email: '',
        mobile: '',
        password: '',
        body_weight: '',
      });
    } catch (err: any) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
      <h2 className='text-xl'>Sign up</h2>

      <form className='flex flex-col gap-y-3 w-full'>
        <input
          type='text'
          name='f_name'
          placeholder='First Name'
          autoComplete='off'
          autoFocus
          onChange={handleInput}
          required
        />
        <input
          type='text'
          name='l_name'
          placeholder='Last Name'
          autoComplete='off'
          onChange={handleInput}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email address'
          autoComplete='off'
          onChange={handleInput}
          required
        />
        <input
          type='tel'
          name='mobile'
          placeholder='Mobile number'
          autoComplete='off'
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
        <input
          id='bodyWeight'
          type='number'
          name='body_weight'
          placeholder='(Optional) Body weight (kg)'
          onChange={handleInput}
        />

        <Button label='Sign up' action={handleSignup} />
      </form>

      <p>
        Already have an account?{' '}
        <span className='text-blue-500'>
          <Link to='/login'>Log in</Link>
        </span>
      </p>
    </div>
  );
};

export default Signup;
