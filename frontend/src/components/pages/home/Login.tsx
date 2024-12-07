import React, { useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import axiosInstance from '../../../api/axiosInstance';
import HomeLayout from './HomeLayout';
import { Eye, EyeClosed } from 'lucide-react';

interface FormInputsInterface {
  email: string;
  password: string;
}

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputsInterface>();

  const [errRes, setErrRes] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleLogin: SubmitHandler<FormInputsInterface> = async (data) => {
    const { email, password } = data;
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
      const message = err.response.message;
      setErrRes(message);
      console.error(message);
    }
  };

  return (
    <HomeLayout>
      <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
        <h2 className='text-xl font-semibold'>Log in</h2>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className='flex flex-col gap-y-5 w-full'
        >
          <label className='relative w-full'>
            <input
              id='email'
              type='email'
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: 'Invalid email format',
                },
              })}
              className={clsx(
                'peer w-full py-2 px-4 border rounded focus:outline-none focus:ring-2',
                { 'border-slate-500 focus:ring-slate-800': !errors.email },
                {
                  'border-red-500 focus:ring-red-500': errors.email,
                }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.email },
                { 'text-slate-500 peer-focus:text-black': !errors.email }
              )}
            >
              {errors.email ? errors.email.message : 'Email'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('email') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>

          <label className='relative w-full'>
            <input
              id='password'
              type={isVisible ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className={clsx(
                'peer w-full py-2 px-4 border rounded focus:outline-none focus:ring-2',
                { 'border-slate-500 focus:ring-slate-800': !errors.password },
                {
                  'border-red-500 focus:ring-red-500': errors.password,
                }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.password },
                { 'text-slate-500 peer-focus:text-black': !errors.password }
              )}
            >
              {errors.password ? errors.password.message : 'Password'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-10 top-2'>
              {errRes.toLowerCase().includes('password') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>

            <div
              className='absolute right-4 top-2.5 cursor-pointer'
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye size={16} className='stroke-slate-800' />
              ) : (
                <EyeClosed size={16} className='stroke-slate-400' />
              )}
            </div>
          </label>

          {/* Submit Button */}
          <button
            type='submit'
            className='text-white font-bold bg-emerald-500 py-2 px-4 rounded-full hover:cursor-pointer hover:bg-emerald-700'
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <p>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500 underline'>
            Sign up
          </Link>
        </p>
      </div>
    </HomeLayout>
  );
};

export default Login;
