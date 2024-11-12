import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Button from './ui/Button';
import { CirclePlus, Pencil, Trash2, X } from 'lucide-react';

const Goal = () => {
  const initialVal: GoalInterface = {
    goal_type: '',
    weekly_goal: 0,
    total_duration: 0,
  };

  //   for display data
  const [goalOutput, setGoalOutput] = useState<GoalInterface[]>([]);
  const fetchGoal: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<GoalInterface[]>(
        '/v1/member/goal'
      );

      if (status === 200) setGoalOutput(data);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  //   for data input from users
  const [splash, setSplash] = useState<boolean>(false);

  const [goalInput, setGoalInput] = useState<GoalInterface>(initialVal);

  const handleChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setGoalInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGoal: handleBtnActionProp = async () => {
    const { goal_type, weekly_goal, total_duration } = goalInput;
    try {
      await axiosInstance.post('/v1/member/goal', {
        goal_type,
        weekly_goal,
        total_duration,
      });

      setGoalInput(initialVal);
    } catch (err: any) {
      console.error(err.response.data.message);
    } finally {
      fetchGoal();
      setSplash(false);
    }
  };

  return (
    <>
      {/* <div className='hidden md:flex flex-row justify-start items-center m-2 px-5 gap-x-3'>
        <Button label='Set Goal' action={() => setSplash(true)} />
      </div> */}

      <div className='flex flex-col md:flex-row justify-evenly items-center h-5/6 my-2 mx-2 px-5'>
        <div className='flex flex-col justify-start items-center gap-y-5 py-3 w-full md:w-5/6 h-full rounded-2xl text-center'>
          {/*   {splash && (
            <div className='absolute bg-slate-100 w-3/5 h-1/2 z-10'>
              <div className='px-10 py-3'>
                <p className='text-lg text-center'>
                  Set a Goal
                  <span
                    className='px-3 py-1 text-sm float-right hover:text-white hover:bg-slate-700 rounded-2xl hover:cursor-pointer'
                    onClick={() => setSplash(false)}
                  >
                    close
                  </span>
                </p>
                <form className='flex flex-col justify-evenly items-center gap-y-2'>
                  <label htmlFor='goal_type'>Goal Type: </label>
                  <select
                    id='goal_type'
                    name='goal_type'
                    onChange={handleChange}
                    required
                  >
                    <option value='Workout days'>Workout days</option>
                    <option value='Calories burned'>Calories burned</option>
                    <option value='Workout duration'>Workout duration</option>
                    <option value='Workout distance'>Workout distance</option>
                  </select>
                  {goalInput.goal_type === 'Workout days' ? (
                    <input
                      type='number'
                      name='weekly_goal'
                      placeholder='Workout days'
                      onChange={handleChange}
                      min={1}
                      max={7}
                      required
                      autoComplete='off'
                    />
                  ) : goalInput.goal_type === 'Calories burned' ? (
                    <input
                      type='number'
                      name='weekly_goal'
                      placeholder='Calories burned'
                      onChange={handleChange}
                      min={0}
                      required
                      autoComplete='off'
                    />
                  ) : goalInput.goal_type === 'Workout duration' ? (
                    <input
                      type='number'
                      name='weekly_goal'
                      placeholder='Workout duration (min)'
                      onChange={handleChange}
                      min={0}
                      required
                      autoComplete='off'
                    />
                  ) : (
                    <input
                      type='number'
                      name='weekly_goal'
                      placeholder='Workout distance (km)'
                      onChange={handleChange}
                      min={0}
                      required
                      autoComplete='off'
                    />
                  )}
                  <input
                    type='number'
                    name='total_duration'
                    placeholder='Total Duration (weeks)'
                    onChange={handleChange}
                    min={1}
                    autoComplete='off'
                    required
                  />
                  <Button label='Add' action={handleAddGoal} />
                </form>
              </div>
            </div>
          )} */}

          <div className='text-lg'>Goals</div>
          <div className='flex flex-col md:flex-row md:flex-wrap justify-evenly items-center gap-2 p-2 w-full md:w-5/6 h-full'>
            {goalOutput
              ?.filter(
                (data: GoalInterface) => data.goal_type === 'Workout days'
              )
              ?.map((data: GoalInterface) => {
                return (
                  <div
                    key={data.id}
                    className='flex flex-col justify-evenly items-center w-full md:w-5/12 h-1/3 bg-emerald-100 rounded-2xl'
                  >
                    <p className='text-lg'>Workout Days</p>
                    <div className='flex flex-row justify-center items-center '>
                      <span>
                        {data.weekly_goal}{' '}
                        {data.weekly_goal > 1 ? 'days' : 'day'}
                        /week{' '}
                      </span>
                      <X size={16} />
                      <span>
                        {data.total_duration}{' '}
                        {data.total_duration > 1 ? 'weeks' : 'week'}
                      </span>
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                      <CirclePlus size={16} className='hover:cursor-pointer' />
                      <Pencil size={16} className='hover:cursor-pointer' />
                      <Trash2
                        size={16}
                        color='red'
                        className='hover:cursor-pointer'
                        onClick={() => console.log('delete')}
                      />
                    </div>
                  </div>
                );
              })}

            {goalOutput
              ?.filter(
                (data: GoalInterface) => data.goal_type === 'Calories burned'
              )
              ?.map((data: GoalInterface) => {
                return (
                  <div
                    key={data.id}
                    className='flex flex-col justify-evenly items-center w-full md:w-5/12 h-1/3 bg-emerald-100 rounded-2xl'
                  >
                    <p className='text-lg'>Calories Burned</p>
                    <div className='flex flex-row justify-center items-center '>
                      <span>{data.weekly_goal} cals/week </span>
                      <X size={16} />
                      <span>
                        {data.total_duration}{' '}
                        {data.total_duration > 1 ? 'weeks' : 'week'}
                      </span>
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                      <Pencil size={16} className='hover:cursor-pointer' />
                      <Trash2
                        size={16}
                        color='red'
                        className='hover:cursor-pointer'
                      />
                    </div>
                  </div>
                );
              })}

            {goalOutput
              ?.filter(
                (data: GoalInterface) => data.goal_type === 'Workout duration'
              )
              ?.map((data: GoalInterface) => {
                return (
                  <div
                    key={data.id}
                    className='flex flex-col justify-evenly items-center w-full md:w-5/12 h-1/3 bg-emerald-100 rounded-2xl'
                  >
                    <p className='text-lg'>Workout Duration</p>
                    <div className='flex flex-row justify-center items-center '>
                      <span>{data.weekly_goal} min/week </span>
                      <X size={16} />
                      <span>
                        {data.total_duration}{' '}
                        {data.total_duration > 1 ? 'weeks' : 'week'}
                      </span>
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                      <Pencil size={16} className='hover:cursor-pointer' />
                      <Trash2
                        size={16}
                        color='red'
                        className='hover:cursor-pointer'
                      />
                    </div>
                  </div>
                );
              })}

            {goalOutput
              ?.filter(
                (data: GoalInterface) => data.goal_type === 'Workout distance'
              )
              ?.map((data: GoalInterface) => {
                return (
                  <div
                    key={data.id}
                    className='flex flex-col justify-evenly items-center w-full md:w-5/12 h-1/3 bg-emerald-100 rounded-2xl'
                  >
                    <p className='text-lg'>Workout Distance</p>
                    <div className='flex flex-row justify-center items-center '>
                      <span>{data.weekly_goal} km/week </span>
                      <X size={16} />
                      <span>
                        {data.total_duration}{' '}
                        {data.total_duration > 1 ? 'weeks' : 'week'}
                      </span>
                    </div>
                    <div className='flex flex-row justify-evenly items-center gap-x-3 m-1 p-1'>
                      <Pencil size={16} className='hover:cursor-pointer' />
                      <Trash2
                        size={16}
                        color='red'
                        className='hover:cursor-pointer'
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Goal;
