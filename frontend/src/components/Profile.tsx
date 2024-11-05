import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import Button from './ui/Button';
import Form from './ui/Form';
import { fetchProfile } from './Mypage';

const Profile = () => {
  const [profile, setProfile] = useState<MemberInterface>();
  const [splash, setSplash] = useState<boolean>(false);

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

  const [input, setInput] = useState({
    f_name: '',
    l_name: '',
    email: '',
    mobile: '',
    body_weight: '',
  });

  const handleChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate: handleBtnActionProp = async () => {
    const { f_name, l_name, email, mobile, body_weight } = input;
    try {
      const { data } = await axiosInstance.put('/v1/member/profile', {
        f_name,
        l_name,
        email,
        mobile,
        body_weight,
      });

      console.log(data.message);

      setInput({
        f_name: '',
        l_name: '',
        email: '',
        mobile: '',
        body_weight: '',
      });
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchProfile();
      setSplash(false);
    }
  };

  const readOnlyDataset = [
    {
      type: 'text',
      name: 'f_name',
      value: profile?.f_name,
      readOnly: true,
    },
    {
      type: 'text',
      name: 'l_name',
      value: profile?.l_name,
      readOnly: true,
    },
    { type: 'email', name: 'email', value: profile?.email, readOnly: true },
    { type: 'tel', name: 'mobile', value: profile?.mobile, readOnly: true },
    {
      type: 'number',
      name: 'body_weight',
      value: profile?.body_weight ?? '',
      readOnly: true,
    },
  ];

  const inputDataset = [
    {
      type: 'text',
      name: 'f_name',
      placeholder: profile?.f_name,
    },
    {
      type: 'text',
      name: 'l_name',
      placeholder: profile?.l_name,
    },
    { type: 'email', name: 'email', placeholder: profile?.email },
    { type: 'tel', name: 'mobile', placeholder: profile?.mobile?.toString() },
    {
      type: 'number',
      name: 'body_weight',
      placeholder: profile?.body_weight?.toString() || 'No data',
    },
  ];

  const confirmBtnDataset = { label: 'Confirm', action: handleUpdate };

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center h-full my-1 mx-2 px-5 gap-x-5'>
      <div className='w-full md:w-1/3 h-5/6 p-2 m-2 shadow-lg rounded'>
        <h3 className='text-center'>Profile</h3>
        {!splash ? (
          <>
            <div className='m-auto p-3 w-5/6'>
              <Form inputDataset={readOnlyDataset} />
            </div>
            <div className='flex flex-row justify-evenly items-center gap-x-2 mb-5'>
              <Button label='Update' action={() => setSplash(true)} />
              <Button label='Delete' action={() => console.log('Delete')} />
            </div>
          </>
        ) : (
          <div className='m-auto p-3 w-5/6'>
            <Form
              inputDataset={inputDataset}
              handleChange={handleChange}
              buttonDataset={confirmBtnDataset}
            />
          </div>
        )}
      </div>
      <div className='w-full md:w-1/3 h-5/6 p-2 m-2 shadow-lg rounded'>
        <h3 className='text-center'>Payment Info</h3>
      </div>
      <div className='w-full md:w-1/3 h-5/6 p-2 m-2 shadow-lg rounded'>
        <h3 className='text-center'>Friends</h3>
      </div>
    </div>
  );
};

export default Profile;