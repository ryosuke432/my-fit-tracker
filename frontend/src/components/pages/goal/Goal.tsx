import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { CirclePlus, Pencil, Trash2, X } from 'lucide-react';
import GoalForm from './GoalForm';

const Goal = () => {
  const initialVal: GoalInterface = {
    goal_type: '',
    weekly_goal: 0,
    total_duration: 0,
  };

  //   for display data
  const [goalDays, setGoalDays] = useState<GoalInterface>(initialVal);
  const [goalCal, setGoalCal] = useState<GoalInterface>(initialVal);
  const [goalDistance, setGoalDistance] = useState<GoalInterface>(initialVal);
  const [goalDuration, setGoalDuration] = useState<GoalInterface>(initialVal);

  const [flipGoal, setFlipGoal] = useState<number>(0);

  const fetchGoal: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<GoalInterface[]>(
        '/v1/member/goal'
      );

      if (status === 200) {
        for (let goal of data) {
          switch (goal.goal_type) {
            case 'Workout days':
              setGoalDays(goal);
              break;
            case 'Calories burned':
              setGoalCal(goal);
              break;
            case 'Workout distance':
              setGoalDistance(goal);
              break;
            case 'Workout duration':
              setGoalDuration(goal);
              break;
          }
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  const handleDelete = async (id: string) => {
    try {
      const { status } = await axiosInstance.delete(`/v1/member/goal/${id}`);
      if (status === 200) console.log('Successfully deleted!');
    } catch (err) {
      console.error(err);
    } finally {
      fetchGoal();
    }
  };

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center w-full h-5/6 my-2 mx-2 px-5'>
      {flipGoal === 0 ? (
        <div className='flex flex-col justify-start items-center gap-y-5 py-3 w-full h-full rounded-2xl text-center'>
          <div className='text-lg'>Goals</div>
          <div className='flex flex-col md:grid md:grid-flow-row md:grid-cols-2 md:grid-rows-2 justify-evenly items-center gap-4 p-2 w-full h-full'>
            <div className='flex flex-col justify-evenly items-center w-full h-full bg-emerald-100 rounded-2xl'>
              <h3>Workout days</h3>
              {goalDays.weekly_goal > 0 ? (
                <>
                  <div className='flex flex-row justify-center items-center '>
                    <span>
                      {goalDays.weekly_goal}{' '}
                      {goalDays.weekly_goal > 1 ? 'days' : 'day'}
                      /week{' '}
                    </span>
                    <X size={16} />
                    <span>
                      {goalDays.total_duration}{' '}
                      {goalDays.total_duration > 1 ? 'weeks' : 'week'}
                    </span>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                    <Pencil size={16} className='hover:cursor-pointer' />
                    <Trash2
                      size={16}
                      color='red'
                      className='hover:cursor-pointer'
                      onClick={() =>
                        handleDelete(goalDays.id?.toString() ?? '')
                      }
                    />
                  </div>
                </>
              ) : (
                <button type='button' onClick={() => setFlipGoal(1)}>
                  <CirclePlus size={24} className='hover:cursor-pointer' />
                </button>
              )}
            </div>

            <div className='flex flex-col justify-evenly items-center w-full h-full bg-emerald-100 rounded-2xl'>
              <h3>Calories burned</h3>
              {goalCal.weekly_goal > 0 ? (
                <>
                  <div className='flex flex-row justify-center items-center '>
                    <span>{goalCal.weekly_goal} cal/week</span>
                    <X size={16} />
                    <span>
                      {goalCal.total_duration}{' '}
                      {goalCal.total_duration > 1 ? 'weeks' : 'week'}
                    </span>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                    <Pencil size={16} className='hover:cursor-pointer' />
                    <Trash2
                      size={16}
                      color='red'
                      className='hover:cursor-pointer'
                      onClick={() => handleDelete(goalCal.id?.toString() ?? '')}
                    />
                  </div>
                </>
              ) : (
                <button type='button' onClick={() => setFlipGoal(1)}>
                  <CirclePlus size={24} className='hover:cursor-pointer' />
                </button>
              )}
            </div>

            <div className='flex flex-col justify-evenly items-center w-full h-full bg-emerald-100 rounded-2xl'>
              <h3>Workout Distance</h3>
              {goalDistance.weekly_goal > 0 ? (
                <>
                  <div className='flex flex-row justify-center items-center '>
                    <span>{goalDistance.weekly_goal} km/week</span>
                    <X size={16} />
                    <span>
                      {goalDistance.total_duration}{' '}
                      {goalDistance.total_duration > 1 ? 'weeks' : 'week'}
                    </span>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                    <Pencil size={16} className='hover:cursor-pointer' />
                    <Trash2
                      size={16}
                      color='red'
                      className='hover:cursor-pointer'
                      onClick={() =>
                        handleDelete(goalDistance.id?.toString() ?? '')
                      }
                    />
                  </div>
                </>
              ) : (
                <button type='button' onClick={() => setFlipGoal(1)}>
                  <CirclePlus size={24} className='hover:cursor-pointer' />
                </button>
              )}
            </div>

            <div className='flex flex-col justify-evenly items-center w-full h-full bg-emerald-100 rounded-2xl'>
              <h3>Workout Duration</h3>
              {goalDuration.weekly_goal > 0 ? (
                <>
                  <div className='flex flex-row justify-center items-center '>
                    <span>{goalDuration.weekly_goal} cal/week</span>
                    <X size={16} />
                    <span>
                      {goalDuration.total_duration}{' '}
                      {goalDuration.total_duration > 1 ? 'weeks' : 'week'}
                    </span>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                    <Pencil size={16} className='hover:cursor-pointer' />
                    <Trash2
                      size={16}
                      color='red'
                      className='hover:cursor-pointer'
                      onClick={() =>
                        handleDelete(goalDuration.id?.toString() ?? '')
                      }
                    />
                  </div>
                </>
              ) : (
                <button type='button' onClick={() => setFlipGoal(1)}>
                  <CirclePlus size={24} className='hover:cursor-pointer' />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <GoalForm fetchGoal={fetchGoal} setFlipGoal={setFlipGoal} />
      )}
    </div>
  );
};

export default Goal;
