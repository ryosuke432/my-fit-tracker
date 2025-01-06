import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

const Community = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-1 w-full h-full'>
      <div className='flex flex-col justify-start items-center gap-y-1 w-5/6 h-5/6 border border-slate-600 rounded-2xl'>
        <p>placeholder</p>
      </div>
      <input
        type='text'
        className='w-5/6 h-8 p-2 border border-slate-600 rounded-xl'
      />
      <input
        type='button'
        value='Send'
        className='w-24 h-8 bg-slate-900 text-white rounded-full'
      />
    </div>
  );
};

export default Community;
