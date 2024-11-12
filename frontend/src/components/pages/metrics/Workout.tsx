import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import WorkoutSummary from './WorkoutSummary';
import WorkoutDetails from './WorkoutDetails';
import WorkoutForm from './WorkoutForm';

const Workout = ({
  date,
  flipWorkout,
  setFlipWorkout,
}: {
  date: Date;
  flipWorkout: number;
  setFlipWorkout: React.Dispatch<SetStateAction<number>>;
}) => {
  const [workout, setWorkout] = useState<WorkoutInterface[]>([
    {
      name: '',
      duration_min: 0,
      distance_km: 0,
      calories: 0,
      createdAt: new Date(),
    },
  ]);
  const [dailyWorkout, setDailyWorkout] = useState<
    AggregatedWorkoutInterface[]
  >([
    {
      date: '',
      total_calories: 0,
      total_distance: 0,
      total_duration: 0,
    },
  ]);
  const [weeklyWorkout, setWeeklyWorkout] = useState<
    AggregatedWorkoutInterface[]
  >([
    {
      week: '',
      total_calories: 0,
      total_distance: 0,
      total_duration: 0,
    },
  ]);

  const fetchWorkout: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<WorkoutInterface[]>(
        '/v1/member/workout'
      );
      if (status === 200) setWorkout(data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  const fetchDailyWorkout: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<
        AggregatedWorkoutInterface[]
      >('/v1/member/workout?date=true');

      if (status === 200) setDailyWorkout(data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  const fetchWeeklyWorkout: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<
        AggregatedWorkoutInterface[]
      >('/v1/member/workout?week=true');

      if (status === 200) setWeeklyWorkout(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchWorkout();
    fetchDailyWorkout();
    fetchWeeklyWorkout();
  }, [fetchWorkout, fetchDailyWorkout, fetchWeeklyWorkout]);

  return (
    <>
      <div className='flex flex-col justify-between items-center py-3 w-full md:w-1/2 h-11/12 md:h-full rounded-2xl'>
        {flipWorkout === 0 ? (
          <WorkoutSummary
            date={date}
            dailyWorkout={dailyWorkout}
            setFlipWorkout={setFlipWorkout}
          />
        ) : flipWorkout === 1 ? (
          <WorkoutDetails
            workout={workout}
            fetchWorkout={fetchWorkout}
            fetchDailyWorkout={fetchDailyWorkout}
            fetchWeeklyWorkout={fetchWeeklyWorkout}
            setFlipWorkout={setFlipWorkout}
          />
        ) : (
          <WorkoutForm
            fetchWorkout={fetchWorkout}
            fetchDailyWorkout={fetchDailyWorkout}
            fetchWeeklyWorkout={fetchWeeklyWorkout}
            setFlipWorkout={setFlipWorkout}
          />
        )}
      </div>
    </>
  );
};

export default Workout;
