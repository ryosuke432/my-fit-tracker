import React, { useState } from 'react';
import axios from 'axios';
import Button from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [accessToken, setAccessToken] = useState('' as string);


  const handleLogin = async () => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/login',
      data: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setEmail('');
    setPassword('');

    if (data?.accessToken) {
      setAccessToken(data.accessToken);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
      <h2 className='text-xl'>Log in</h2>

      <form className='flex flex-col gap-y-3 w-full'>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          autoComplete='off'
          autoFocus={true}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />

        <Button label='Log in' action={handleLogin} />
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
