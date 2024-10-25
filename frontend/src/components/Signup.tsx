import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const Signup = () => {
  const [fname, setFname] = useState('' as string);
  const [lname, setLname] = useState('' as string);
  const [email, setEmail] = useState('' as string);
  const [mobile, setMobile] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [bodyWeight, setBodyWeight] = useState('' as string);

  const handleSignup = async () => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/auth/signup',
      data: {
        f_name: fname,
        l_name: lname,
        email,
        mobile,
        password,
        body_weight: bodyWeight,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(data)

    setFname('');
    setLname('');
    setEmail('');
    setMobile('');
    setPassword('');
    setBodyWeight('');

    
  };

  return (
    <div className='container min-w-72 w-96 mx-auto px-4 py-2 flex flex-col justify-evenly items-center gap-y-5 text-center border-2 border-solid border-slate-900 rounded'>
      <h2 className='text-xl'>Sign up</h2>

      <form className='flex flex-col gap-y-3 w-full'>
        <input
          type='text'
          name='fname'
          placeholder='First Name'
          value={fname}
          autoComplete='off'
          onChange={(e) => setFname(e.target.value)}
          required={true}
        />
        <input
          type='text'
          name='lname'
          placeholder='Last Name'
          value={lname}
          autoComplete='off'
          onChange={(e) => setLname(e.target.value)}
          required={true}
        />
        <input
          type='email'
          name='email'
          placeholder='Email address'
          value={email}
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <input
          type='tel'
          name='mobile'
          placeholder='Mobile number'
          value={mobile}
          autoComplete='off'
          onChange={(e) => setMobile(e.target.value)}
          required={true}
        />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <input
          id='bodyWeight'
          type='number'
          name='bodyWeight'
          placeholder='(Optional) Body Weight (kg)'
          value={bodyWeight}
          onChange={(e) => setBodyWeight(e.target.value)}
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
