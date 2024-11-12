import React, { SetStateAction, useState } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import Button from './ui/Button';

const WorkoutForm = ({
  fetchWorkout,
  fetchDailyWorkout,
  fetchWeeklyWorkout,
  setFlipWorkout,
}: {
  fetchWorkout: () => Promise<void>;
  fetchDailyWorkout: () => Promise<void>;
  fetchWeeklyWorkout: () => Promise<void>;
  setFlipWorkout: React.Dispatch<SetStateAction<number>>;
}) => {
  const [input, setInput] = useState<WorkoutInterface>({
    name: '',
    duration_min: 0,
    distance_km: 0,
  });
  const handleChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddWorkout: handleBtnActionProp = async () => {
    const { name, duration_min, distance_km } = input;
    try {
      await axiosInstance.post('/v1/member/workout', {
        name,
        duration_min,
        distance_km,
      });

      setInput({
        name: '',
        duration_min: 0,
        distance_km: 0,
      });
      setFlipWorkout(0);
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchWorkout();
      fetchDailyWorkout();
      fetchWeeklyWorkout();
    }
  };
  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Add Workout</h3>
        <button type='button' onClick={() => setFlipWorkout(0)}>
          <X
            size={16}
            strokeWidth={1.5}
            className='stroke-slate-400 hover:stroke-slate-500'
          />
        </button>
      </div>

      <form className='grow flex flex-col gap-y-3 w-full'>
        <input
          type='name'
          name='name'
          placeholder='Name'
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          type='number'
          name='distance_km'
          placeholder='Distance (km)'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='duration_min'
          placeholder='Duration (min)'
          onChange={handleChange}
          required
        />
        <Button label='Add' action={handleAddWorkout} />
      </form>
    </>
  );
};

export default WorkoutForm;
