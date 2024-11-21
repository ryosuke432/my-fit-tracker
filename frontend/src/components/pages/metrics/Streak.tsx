import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }: { data: any }) => {
  return (
    <div className='chart-container'>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

const Streak = () => {
  return <div>Streak</div>;
};

export default Streak;
