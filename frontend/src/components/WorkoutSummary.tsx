import React, { SetStateAction } from 'react';
import { ScrollText } from 'lucide-react';

const WorkoutSummary = ({
  date,
  dailyWorkout,
  setFlipWorkout,
}: {
  date: Date;
  dailyWorkout: AggregatedWorkoutInterface[];
  setFlipWorkout: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Workout</h3>
        <button type='button' onClick={() => setFlipWorkout(1)}>
          <ScrollText
            size={16}
            strokeWidth={1.5}
            className='stroke-slate-400 hover:stroke-slate-500'
          />
        </button>
      </div>

      {dailyWorkout
        ?.filter(
          (data: AggregatedWorkoutInterface) =>
            data.date === date.toISOString().split('T')[0]
        )
        .map((data: AggregatedWorkoutInterface) => {
          return (
            <div
              key={data.date}
              className='grow flex flex-col justify-evenly items-center w-5/6'
            >
              <div className='border-2 border-emerald-900 rounded-full w-24 h-24 m-auto'>
                <div className='relative top-1/4'>
                  <p className='text-xl'>
                    {data.total_calories ? data.total_calories : 'No data'}
                  </p>
                  <small>Cal</small>
                </div>
              </div>
              <div className='flex flex-row justify-evenly items-center gap-x-3 w-full'>
                <div>
                  <p>{data.total_distance ? data.total_distance : 'No data'}</p>
                  <small>Distance</small>
                </div>
                <div>
                  <p>{data.total_duration ? data.total_duration : 'No data'}</p>
                  <small>Duration</small>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default WorkoutSummary;
