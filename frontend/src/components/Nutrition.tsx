import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import NutritionSummary from './NutritionSummary';
import NutritionDetails from './NutritionDetails';
import NutritionForm from './NutritionForm';

export const Nutrition = ({
  date,
  flipNutrition,
  setFlipNutrition,
}: {
  date: Date;
  flipNutrition: number;
  setFlipNutrition: React.Dispatch<SetStateAction<number>>;
}) => {
  const [nutrition, setNutrition] = useState<NutritionInterface[]>([
    {
      name: '',
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      createdAt: new Date(),
    },
  ]);
  const [dailyNutrition, setDailyNutrition] = useState<
    AggregatedNutritionInterface[]
  >([
    {
      date: '',
      total_calories: 0,
      total_protein: 0,
      total_fat: 0,
      total_carbohydrates: 0,
    },
  ]);
  const [weeklyNutrition, setWeeklyNutrition] = useState<
    AggregatedNutritionInterface[]
  >([
    {
      week: '',
      total_calories: 0,
      total_protein: 0,
      total_fat: 0,
      total_carbohydrates: 0,
    },
  ]);

  const fetchNutrition: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<NutritionInterface[]>(
        '/v1/member/nutrition'
      );
      if (status === 200) setNutrition(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchDailyNutrition: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<
        AggregatedNutritionInterface[]
      >('/v1/member/nutrition?date=true');
      if (status === 200) setDailyNutrition(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchWeeklyNutrition: () => Promise<void> = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<
        AggregatedNutritionInterface[]
      >('/v1/member/nutrition?week=true');
      if (status === 200) setWeeklyNutrition(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchNutrition();
    fetchDailyNutrition();
    fetchWeeklyNutrition();
  }, [fetchNutrition, fetchDailyNutrition, fetchWeeklyNutrition]);

  return (
    <>
      <div className='flex flex-col justify-between items-center py-3 w-full md:w-1/2 h-full rounded-2xl'>
        {flipNutrition === 0 ? (
          <NutritionSummary
            date={date}
            dailyNutrition={dailyNutrition}
            setFlipNutrition={setFlipNutrition}
          />
        ) : flipNutrition === 1 ? (
          <NutritionDetails
            nutrition={nutrition}
            fetchNutrition={fetchNutrition}
            fetchDailyNutrition={fetchDailyNutrition}
            fetchWeeklyNutrition={fetchWeeklyNutrition}
            setFlipNutrition={setFlipNutrition}
          />
        ) : (
          <NutritionForm
            fetchNutrition={fetchNutrition}
            fetchDailyNutrition={fetchDailyNutrition}
            fetchWeeklyNutrition={fetchWeeklyNutrition}
            setFlipNutrition={setFlipNutrition}
          />
        )}
      </div>
    </>
  );
};

export default Nutrition;
