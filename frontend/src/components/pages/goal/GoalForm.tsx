import React, { SetStateAction, useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { X } from 'lucide-react';

const GoalForm = ({
  fetchGoal,
  setFlipGoal,
  index,
}: {
  fetchGoal: () => Promise<void>;
  setFlipGoal: React.Dispatch<SetStateAction<number>>;
  index: number;
}) => {
  const goalsArr = [
    'Workout days',
    'Calories burned',
    'Workout distance',
    'Workout duration',
  ];
  const goalDaysArr = [1, 2, 3, 4, 5, 6, 7];
  const goalCalsArr = [
    500, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
  ];
  const goalDistArr = [1, 3, 5, 10, 15, 20, 25, 30, 40, 50];
  const goalDurArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const totalDuration = [1, 2, 3, 4, 6, 8, 10, 12];

  const [activeWeeklyGoalBtn, setActiveWeeklyGoalBtn] = useState<number>(-1);
  const [activeTotalDurationBtn, setActiveTotalDurationBtn] =
    useState<number>(-1);

  const [input, setInput] = useState<GoalInterface>({
    goal_type: '',
    weekly_goal: 0,
    total_duration: 0,
  });

  const handleAddWorkout: handleBtnActionProp = async () => {
    try {
      await axiosInstance.post('/v1/member/goal', input);
      setInput({
        goal_type: '',
        weekly_goal: 0,
        total_duration: 0,
      });
      setFlipGoal(-1);
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchGoal();
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  const WeeklyGoalBtn = ({ arr }: { arr: number[] }) => {
    return (
      <div className='flex flex-row justify-around items-center w-full mx-2 p-1 gap-x-3 overflow-x-auto snap-x lg:snap-none'>
        {arr.map((i) => {
          return (
            <button
              key={i}
              type='button'
              className={`min-w-12 h-8 px-2 text-sm lg:text-md overflow-visible rounded-2xl hover:cursor-pointer active:bg-slate-200 ${
                activeWeeklyGoalBtn === i
                  ? 'ring ring-emerald-700 bg-emerald-100'
                  : 'bg-slate-100'
              }`}
              onClick={() => {
                setInput({
                  ...input,
                  goal_type: goalsArr[index],
                  weekly_goal: i,
                });
                setActiveWeeklyGoalBtn(i);
              }}
            >
              {i}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className='flex flex-col justify-start items-center w-full px-4'>
      <div className='flex flex-row justify-around items-center gap-x-3 mb-2'>
        <h2>{goalsArr[index]}</h2>
        <button type='button' onClick={() => setFlipGoal(-1)}>
          <X
            size={16}
            strokeWidth={1.5}
            className='stroke-slate-400 hover:stroke-slate-500'
          />
        </button>
      </div>

      <div className='flex flex-col justify-evenly items-center w-5/6 h-full'>
        <h3>Weekly Goal</h3>
        <div className='flex flex-row justify-around items-center w-full mx-2 p-1 gap-x-3 overflow-x-auto snap-x lg:snap-none'>
          {index === 0 ? (
            <WeeklyGoalBtn arr={goalDaysArr} />
          ) : index === 1 ? (
            <WeeklyGoalBtn arr={goalCalsArr} />
          ) : index === 2 ? (
            <WeeklyGoalBtn arr={goalDistArr} />
          ) : (
            <WeeklyGoalBtn arr={goalDurArr} />
          )}
        </div>

        <h3>Total Duration (weeks)</h3>
        <div className='flex flex-row justify-around items-center w-full mx-2 p-1 gap-x-3 overflow-x-auto snap-x lg:snap-none'>
          {totalDuration.map((i) => {
            return (
              <button
                key={i}
                type='button'
                className={`min-w-10 h-8 px-2 text-sm lg:text-md overflow-visible rounded-2xl hover:cursor-pointer ${
                  activeTotalDurationBtn === i
                    ? 'ring ring-emerald-700 bg-emerald-100'
                    : 'bg-slate-100'
                }`}
                onClick={() => {
                  setInput({ ...input, total_duration: i });
                  setActiveTotalDurationBtn(i);
                }}
              >
                {i}
              </button>
            );
          })}
        </div>

        <button
          type='button'
          onClick={handleAddWorkout}
          className='bg-emerald-500 text-white font-bold w-1/3 h-10 mx-auto rounded-full hover:bg-emerald-700'
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default GoalForm;
