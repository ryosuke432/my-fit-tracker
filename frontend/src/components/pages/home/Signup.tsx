import React, { useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import HomeLayout from './HomeLayout';

interface FormInputsInterface {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  bodyWeight: number;
}

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputsInterface>();

  const [errRes, setErrRes] = useState<string>('');

  const handleSignup: SubmitHandler<FormInputsInterface> = async (data) => {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmPassword,
      bodyWeight,
    } = data;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !bodyWeight
    )
      return;

    if (password !== confirmPassword) return setErrRes('Password mismatch');

    try {
      const { data } = await axiosInstance.post('/v1/auth/signup', {
        firstName,
        lastName,
        email,
        mobile,
        password,
        bodyWeight,
      });

      console.log(data.message);

      navigate('/login');
    } catch (err: any) {
      setErrRes(err.response.data.message);
      console.error(err.response.data.message);
    }
  };

  return (
    <HomeLayout>
      <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
        <h2 className='text-xl'>Sign up</h2>

        <form
          onSubmit={handleSubmit(handleSignup)}
          className='flex flex-col gap-y-3 w-full'
        >
          {/* First Name */}
          <label className='relative w-full'>
            <input
              id='firstName'
              type='text'
              {...register('firstName', {
                required: { value: true, message: 'First name is required' },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.firstName },
                { 'focus:ring-red-500': errors.firstName }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.firstName },
                { 'text-slate-500': !errors.firstName }
              )}
            >
              {errors.firstName ? errors.firstName.message : 'First name'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('first') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>
          {/* Last Name */}
          <label className='relative w-full'>
            <input
              id='lastName'
              type='text'
              {...register('lastName', {
                required: { value: true, message: 'Last name is required' },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.lastName },
                { 'focus:ring-red-500': errors.lastName }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.lastName },
                { 'text-slate-500': !errors.lastName }
              )}
            >
              {errors.lastName ? errors.lastName.message : 'Last name'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('last') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>
          {/* Email */}
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
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.email },
                { 'focus:ring-red-500': errors.email }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.email },
                { 'text-slate-500': !errors.email }
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
          {/* Mobile Number */}
          <label className='relative w-full'>
            <input
              id='mobile'
              type='text'
              {...register('mobile', {
                required: { value: true, message: 'Mobile number is required' },
                pattern: {
                  value: /^[+]?[0-9]{7,15}$/,
                  message: 'Invalid mobile number format',
                },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.mobile },
                { 'focus:ring-red-500': errors.mobile }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.mobile },
                { 'text-slate-500': !errors.mobile }
              )}
            >
              {errors.mobile ? errors.mobile.message : 'Mobile'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('mobile') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>
          {/* Password */}
          <label className='relative w-full'>
            <input
              id='password'
              type='text'
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.password },
                { 'focus:ring-red-500': errors.password }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.password },
                { 'text-slate-500': !errors.password }
              )}
            >
              {errors.password ? errors.password.message : 'Password'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('password') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>
          {/* Confirm Password */}
          <label className='relative w-full'>
            <input
              id='confirmPassword'
              type='text'
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: 'Password confirmation is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.confirmPassword },
                { 'focus:ring-red-500': errors.confirmPassword }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.confirmPassword },
                { 'text-slate-500': !errors.confirmPassword }
              )}
            >
              {errors.confirmPassword
                ? errors.confirmPassword.message
                : 'Confirm password'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('password') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>
          {/* Body weight */}
          <label className='relative w-full'>
            <input
              id='bodyWeight'
              type='text'
              {...register('bodyWeight', {
                required: { value: true, message: 'Body weight is required' },
                min: {
                  value: 20,
                  message: 'Too small number is entered',
                },
              })}
              className={clsx(
                'w-full py-2 px-4 border border-slate-400 rounded focus:outline-none focus:ring-2',
                { 'focus:ring-slate-800': !errors.bodyWeight },
                { 'focus:ring-red-500': errors.bodyWeight }
              )}
            />
            <p
              className={clsx(
                'absolute text-xs px-1 bg-white left-4 -top-2',
                { 'text-red-500': errors.bodyWeight },
                { 'text-slate-500': !errors.bodyWeight }
              )}
            >
              {errors.bodyWeight
                ? errors.bodyWeight.message
                : 'Body weight (kg)'}
            </p>
            <p className='absolute text-s text-red-500 px-1 bg-white right-4 top-2'>
              {errRes.toLowerCase().includes('first') && (
                <span className='text-xs text-red-500'>{errRes}</span>
              )}
            </p>
          </label>

          {/* Submit Button */}
          <button
            type='submit'
            className='text-white font-bold bg-emerald-500 py-2 px-4 rounded-full hover:cursor-pointer hover:bg-emerald-700'
          >
            Sign Up
          </button>
        </form>

        {/* Log In Link */}
        <p>
          Already have an account?{' '}
          <span className='text-blue-500'>
            <Link to='/login'>Log in</Link>
          </span>
        </p>
      </div>
    </HomeLayout>
  );
};

export default Signup;
