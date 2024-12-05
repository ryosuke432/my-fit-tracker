import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { CirclePlus, Trash2, X } from 'lucide-react';
import GoalForm from './GoalForm';

const Goal = () => {
  const [goals, setGoals] = useState<GoalInterface[]>();
  const goalsArr = [
    { type: 'Workout days', unit: 'day' },
    { type: 'Calories burned', unit: 'cal' },
    { type: 'Workout distance', unit: 'km' },
    { type: 'Workout duration', unit: 'min' },
  ];

  const [flipGoal, setFlipGoal] = useState<number>(-1);

  const fetchGoal: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<GoalInterface[]>(
        '/v1/member/goal'
      );
      if (status === 200) setGoals(data);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

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

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal, setGoals]);

  const GoalCard = ({ index }: { index: number }) => {
    return (
      <div className='flex flex-col justify-evenly items-center w-full h-full bg-slate-100 rounded-2xl'>
        <span className='text-lg font-bold'>{goalsArr[index]['type']}</span>
        {!goals?.some(
          (goal: GoalInterface) => goal.name === goalsArr[index]['type']
        ) ? (
          <button type='button' onClick={() => setFlipGoal(index)}>
            <CirclePlus size={24} className='hover:cursor-pointer fill-white' />
          </button>
        ) : (
          goals
            .filter((goal) => goal.name === goalsArr[index]['type'])
            .map((workoutGoal) => (
              <>
                <div
                  key={workoutGoal.id}
                  className='flex flex-row justify-center items-center gap-x-2'
                >
                  <span>
                    {workoutGoal.weekly_goal}{' '}
                    {goalsArr[index]['unit'] === 'day'
                      ? workoutGoal.weekly_goal > 1
                        ? `${goalsArr[index]['unit']}s`
                        : `${goalsArr[index]['unit']}`
                      : goalsArr[index]['unit']}
                    /week{' '}
                  </span>
                  <X size={16} />
                  <span>
                    {workoutGoal.total_duration}{' '}
                    {workoutGoal.total_duration > 1 ? 'weeks' : 'week'}
                  </span>
                </div>
                <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                  <Trash2
                    size={16}
                    color='red'
                    className='hover:cursor-pointer'
                    onClick={() =>
                      handleDelete(workoutGoal.id?.toString() ?? '')
                    }
                  />
                </div>
              </>
            ))
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center w-full h-full my-2 mx-2 px-5'>
      <div className='flex flex-col justify-start items-center gap-y-2 py-3 w-full h-full rounded-2xl text-center'>
        <div className='text-xl font-bold'>Goals</div>
        <div className='flex flex-col md:grid md:grid-flow-row md:grid-cols-2 md:grid-rows-2 justify-evenly items-center gap-4 p-2 w-full h-full'>
          {[0, 1, 2, 3].map((i: number) => {
            return (
              <>
                {flipGoal === i ? (
                  <GoalForm
                    key={i}
                    fetchGoal={fetchGoal}
                    setFlipGoal={setFlipGoal}
                    index={i}
                  />
                ) : (
                  <GoalCard key={i} index={i} />
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goal;
