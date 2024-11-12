import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import Button from '../../ui/Button';
import { X } from 'lucide-react';

const GoalForm = ({
  fetchGoal,
  setFlipGoal,
}: {
  fetchGoal: () => Promise<void>;
  setFlipGoal: React.Dispatch<SetStateAction<number>>;
}) => {
  const [input, setInput] = useState<GoalInterface>({
    goal_type: '',
    weekly_goal: 0,
    total_duration: 0,
  });
  const handleChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddWorkout: handleBtnActionProp = async () => {
    const { goal_type, weekly_goal, total_duration } = input;
    try {
      await axiosInstance.post('/v1/member/goal', {
        goal_type,
        weekly_goal,
        total_duration,
      });

      setInput({
        goal_type: '',
        weekly_goal: 0,
        total_duration: 0,
      });
      setFlipGoal(0);
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchGoal();
    }
  };
  return (
    <div className='flex flex-col justify-start items-center gap-y-4 w-full md:w-5/6'>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Set Goal</h3>
        <button type='button' onClick={() => setFlipGoal(0)}>
          <X
            size={16}
            strokeWidth={1.5}
            className='stroke-slate-400 hover:stroke-slate-500'
          />
        </button>
      </div>

      <form className='grow flex flex-col gap-y-3 w-full'>
        <input
          type='string'
          name='goal_type'
          placeholder='Goal Type: Workout days/Calories burned/Workout distance/Workout duration'
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          type='number'
          name='weekly_goal'
          placeholder='Weekly goal'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='total_duration'
          placeholder='How many weeks?'
          onChange={handleChange}
          required
        />
        <Button label='Set' action={handleAddWorkout} />
      </form>
    </div>
  );
};

export default GoalForm;
