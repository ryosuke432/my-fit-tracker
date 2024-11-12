import React, { SetStateAction, useState } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import Button from './ui/Button';

const NutritionForm = ({
  fetchNutrition,
  fetchDailyNutrition,
  fetchWeeklyNutrition,
  setFlipNutrition,
}: {
  fetchNutrition: () => Promise<void>;
  fetchDailyNutrition: () => Promise<void>;
  fetchWeeklyNutrition: () => Promise<void>;
  setFlipNutrition: React.Dispatch<SetStateAction<number>>;
}) => {
  const [nutritionInput, setNutritionInput] = useState<NutritionInterface>({
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  const handleNutritionChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setNutritionInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNutrition: handleBtnActionProp = async () => {
    const { name, calories, protein, fat, carbohydrates } = nutritionInput;
    try {
      await axiosInstance.post('/v1/member/nutrition', {
        name,
        calories,
        protein,
        fat,
        carbohydrates,
      });

      setNutritionInput({
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0,
      });
      setFlipNutrition(0);
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchNutrition();
      fetchDailyNutrition();
      fetchWeeklyNutrition();
    }
  };

  const handleUpdateNutrition: handleBtnActionProp = async () => {
    const { name, calories, protein, fat, carbohydrates } = nutritionInput;
    try {
      await axiosInstance.put('/v1/member/nutrition', {
        name,
        calories,
        protein,
        fat,
        carbohydrates,
      });

      setNutritionInput({
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0,
      });
      setFlipNutrition(0);
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchNutrition();
      fetchDailyNutrition();
      fetchWeeklyNutrition();
    }
  };

  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Add Nutrition</h3>
        <button type='button' onClick={() => setFlipNutrition(0)}>
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
          name='name'
          placeholder='Name'
          onChange={handleNutritionChange}
          autoFocus
          required
        />
        <input
          type='number'
          name='calories'
          placeholder='Calories'
          onChange={handleNutritionChange}
        />
        <input
          type='number'
          name='protein'
          placeholder='Protein'
          onChange={handleNutritionChange}
        />
        <input
          type='number'
          name='fat'
          placeholder='Fat'
          onChange={handleNutritionChange}
        />
        <input
          type='number'
          name='carbohydrates'
          placeholder='Carbohydrates'
          onChange={handleNutritionChange}
        />
        <Button label='Add' action={handleAddNutrition} />
      </form>
    </>
  );
};

export default NutritionForm;
