import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Workout from './Workout';
import Nutrition from './Nutrition';

const Metrics = () => {
  const [flipWorkout, setFlipWorkout] = useState<number>(0);
  const [flipNutrition, setFlipNutrition] = useState<number>(0);

  const today = new Date();
  const [dateDisplay, setDateDisplay] = useState<Date>(today);

  const changeDate = (days: number) => {
    const newDate = new Date(dateDisplay);
    newDate.setDate(newDate.getDate() + days);
    setDateDisplay(newDate);
  };

  return (
    <>
      <div className='hidden md:flex md:flex-row md:justify-start md:items-center md:m-2 md:px-5 md:gap-x-5'>
        <button
          type='button'
          onClick={() => setFlipWorkout(2)}
          className='text-white font-bold text-sm bg-emerald-500 rounded-full p-2 hover:bg-emerald-700 hover:cursor-pointer'
        >
          add Workout
        </button>
        <button
          type='button'
          onClick={() => setFlipNutrition(2)}
          className='text-white font-bold text-sm bg-emerald-500 rounded-full p-2 hover:bg-emerald-700 hover:cursor-pointer'
        >
          add Nutrition
        </button>
        <button type='button' onClick={() => changeDate(-1)}>
          <ChevronLeft
            size={36}
            strokeWidth={2.5}
            color='white'
            className='p-2 bg-emerald-500 rounded-full hover:bg-emerald-700'
          />
        </button>
        <h3 className='shrink-0'>{dateDisplay.toISOString().split('T')[0]}</h3>
        <button type='button' onClick={() => changeDate(1)}>
          <ChevronRight
            size={36}
            strokeWidth={2.5}
            color='white'
            className='p-2 bg-emerald-500 rounded-full hover:bg-emerald-700'
          />
        </button>
      </div>

      <div className='flex flex-col md:flex-row justify-evenly items-center h-11/12 md:h-5/6 my-3 mx-2 md:px-5 gap-y-3 gap-x-5'>
        <Workout
          date={dateDisplay}
          flipWorkout={flipWorkout}
          setFlipWorkout={setFlipWorkout}
        />
        <Nutrition
          date={dateDisplay}
          flipNutrition={flipNutrition}
          setFlipNutrition={setFlipNutrition}
        />
      </div>
    </>
  );
};

export default Metrics;
