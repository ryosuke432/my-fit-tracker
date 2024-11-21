import React, { SetStateAction } from 'react';
import { ScrollText } from 'lucide-react';

const NutritionSummary = ({
  date,
  dailyNutrition,
  setFlipNutrition,
}: {
  date: Date;
  dailyNutrition: AggregatedNutritionInterface[];
  setFlipNutrition: React.Dispatch<SetStateAction<number>>;
}) => {
  const Skeleton = () => {
    return (
      <div className='grow flex flex-col justify-evenly items-center w-5/6'>
        <div className='border-2 border-emerald-900 rounded-full w-24 h-24 m-auto'>
          <div className='relative top-1/4'>
            <p className='text-xl'>No data</p>
            <small>Cal</small>
          </div>
        </div>
        <div className='flex flex-row justify-evenly items-center gap-x-3 w-full'>
          <div>
            <p>No data</p>
            <small>Protein</small>
          </div>
          <div>
            <p>No data</p>
            <small>Fat</small>
          </div>
          <div>
            <p>No data</p>
            <small>Carbs</small>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Nutrition</h3>
        <button type='button' onClick={() => setFlipNutrition(1)}>
          <ScrollText
            size={16}
            strokeWidth={1.5}
            className='stroke-slate-400 hover:stroke-slate-500'
          />
        </button>
      </div>

      {!dailyNutrition.some(
        (data: AggregatedNutritionInterface) =>
          data.date === date.toISOString().split('T')[0]
      ) ? (
        <Skeleton />
      ) : (
        dailyNutrition
          .filter(
            (data: AggregatedNutritionInterface) =>
              data.date === date.toISOString().split('T')[0]
          )
          .map((data: AggregatedNutritionInterface) => {
            return (
              <div
                key={data.date}
                className='grow flex flex-col justify-evenly items-center w-5/6'
              >
                <div className='border-2 border-emerald-900 rounded-full w-24 h-24 m-auto'>
                  <div className='relative top-1/4'>
                    <p className='text-xl'>{data.total_calories}</p>
                    <small>Cal</small>
                  </div>
                </div>
                <div className='flex flex-row justify-evenly items-center gap-x-3 w-full'>
                  <div>
                    <p>{data.total_protein}</p>
                    <small>Protein</small>
                  </div>
                  <div>
                    <p>{data.total_fat}</p>
                    <small>Fat</small>
                  </div>
                  <div>
                    <p>{data.total_carbohydrates}</p>
                    <small>Carbs</small>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </>
  );
};

export default NutritionSummary;
