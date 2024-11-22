import React, { SetStateAction, useEffect, useRef } from 'react';
import { BarChart, XAxis, Tooltip, Bar } from 'recharts';
import { X } from 'lucide-react';

const NutritionDetails = ({
  nutrition,
  dailyNutrition,
  weeklyNutrition,
  fetchNutrition,
  fetchDailyNutrition,
  fetchWeeklyNutrition,
  setFlipNutrition,
}: {
  nutrition: NutritionInterface[];
  dailyNutrition: AggregatedNutritionInterface[];
  weeklyNutrition: AggregatedNutritionInterface[];
  fetchNutrition: () => Promise<void>;
  fetchDailyNutrition: () => Promise<void>;
  fetchWeeklyNutrition: () => Promise<void>;
  setFlipNutrition: React.Dispatch<SetStateAction<number>>;
}) => {
  const endDate = new Date();
  const startDate = new Date(`${dailyNutrition[0].date}T00:00:00`);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const allDates = [];
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    allDates.push(formatDate(currentDate));
  }

  const chartData = allDates.map((date) => {
    const activeEntry = dailyNutrition.find((entry) => entry.date === date);
    return {
      date,
      calories: activeEntry?.total_calories ?? 0,
    };
  });

  const getDay = (dateString: string) => {
    const day = new Date(`${dateString}T00:00:00`).getDate();
    return day.toString().padStart(2, '0');
  };

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }
  }, []);

  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Nutrition</h3>
        <button type='button' onClick={() => setFlipNutrition(0)}>
          <X size={16} />
        </button>
      </div>

      <div className='flex flex-col justify-start items-center gap-y-1 w-full h-full'>
        <div className='flex flex-col justify-start items-start gap-y-1 w-3/4 mt-2'>
          <h3 className='float-left'>Calories Taken</h3>
          <div ref={scrollContainerRef} className='w-full overflow-x-auto'>
            <BarChart
              width={chartData.length * 25}
              height={120}
              data={chartData}
            >
              <XAxis
                dataKey='date'
                tickFormatter={getDay}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar dataKey='calories' fill='rgb(16 185 129)' />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default NutritionDetails;
