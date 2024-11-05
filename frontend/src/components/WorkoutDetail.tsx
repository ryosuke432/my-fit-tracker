import React from 'react';
import axiosInstance from '../api/axiosInstance';

const WorkoutDetail = () => {
  return (
    <div>
      <div>
        <p className='inline-block'>previous</p>
        <h1 className='inline-block text-center'>This week</h1>
        <p className='inline-block'>next</p>
      </div>
      <div>Daily data during this week</div>
    </div>
  );
};

export default WorkoutDetail;
