import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Button from './ui/Button';
import Form from './ui/Form';

const Metrics = () => {
  const [workout, setWorkout] = useState<WorkoutInterface[]>();
  const [nutrition, setNutrition] = useState<NutritionInterface[]>();
  const [splashWorkout, setSplashWorkout] = useState<boolean>(false);
  const [splashNutrition, setSplashNutrition] = useState<boolean>(false);
  const [workoutInput, setWorkoutInput] = useState<WorkoutInterface>({
    name: '',
    duration_min: 0,
    distance_km: 0,
  });
  const [nutritionInput, setNutritionInput] = useState<NutritionInterface>({
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  const handleWorkoutChange: handleChangeProp = async (e) => {
    const { name, value } = e.target;
    setWorkoutInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddWorkout: handleBtnActionProp = async () => {
    const { name, duration_min, distance_km } = workoutInput;
    try {
      const { data } = await axiosInstance.post('/v1/member/workout', {
        name,
        duration_min,
        distance_km,
      });

      console.log(data.message);

      setWorkoutInput({
        name: '',
        duration_min: 0,
        distance_km: 0,
      });
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchWorkout();
      setSplashWorkout(false);
    }
  };

  const workoutInputDataset = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Workout: Walking, Running, Cycling, or Swimming',
    },
    {
      type: 'number',
      name: 'duration_min',
      placeholder: 'Workout Duration (min)',
    },
    {
      type: 'number',
      name: 'distance_km',
      placeholder: 'Workout Distance (km)',
    },
  ];

  const addWorkoutBtnDataset = { label: 'Add', action: handleAddWorkout };

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
      const { data } = await axiosInstance.post('/v1/member/nutrition', {
        name,
        calories,
        protein,
        fat,
        carbohydrates,
      });

      console.log(data.message);

      setNutritionInput({
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0,
      });
    } catch (err: any) {
      console.error(err.response?.data?.message);
    } finally {
      fetchNutrition();
      setSplashNutrition(false);
    }
  };

  const nutritionInputDataset = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Meal Name',
    },
    {
      type: 'number',
      name: 'calories',
      placeholder: 'Calories',
    },
    {
      type: 'number',
      name: 'protein',
      placeholder: 'Protein',
    },
    {
      type: 'number',
      name: 'fat',
      placeholder: 'Fat',
    },
    {
      type: 'number',
      name: 'carbohydrates',
      placeholder: 'Carbohydrates',
    },
  ];

  const addNutritionBtnDataset = { label: 'Add', action: handleAddNutrition };

  const fetchWorkout = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<WorkoutInterface[]>(
        '/v1/member/workout'
      );
      if (status !== 200) return;
      setWorkout(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchNutrition = useCallback(async () => {
    try {
      const { data, status } = await axiosInstance.get<NutritionInterface[]>(
        '/v1/member/nutrition'
      );
      if (status !== 200) return;
      setNutrition(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchWorkout();
    fetchNutrition();
  }, [fetchWorkout, fetchNutrition]);

  const today = new Date();
  const [dateDisplay, setDateDisplay] = useState<Date>(today);

  const changeDate = (days: number) => {
    const newDate = new Date(dateDisplay);
    newDate.setDate(newDate.getDate() + days);
    setDateDisplay(newDate);
  };

  return (
    <>
      <div className='hidden md:flex flex-row justify-start items-center m-2 px-5 gap-x-5'>
        <Button label='add Workout' action={() => setSplashWorkout(true)} />
        <Button label='add Nutrition' action={() => setSplashNutrition(true)} />
        <Button
          label='<'
          action={() => {
            changeDate(-1);
          }}
        />
        <h3>
          {dateDisplay.toLocaleDateString('en-US', {
            timeZone: 'America/Vancouver',
          })}
        </h3>
        <Button label='>' action={() => changeDate(1)} />
      </div>

      <div className='flex flex-col md:flex-row justify-evenly items-center h-5/6 my-3 mx-2 px-5 gap-x-5'>
        <div className='flex flex-col justify-between items-center py-3 w-full md:w-1/2 h-full shadow-lg rounded text-center'>
          {splashWorkout && (
            <div className='absolute bg-slate-200 w-3/5 h-1/2 z-10'>
              <div className='px-10 py-3'>
                <p>Add New Workout</p>
                <Form
                  inputDataset={workoutInputDataset}
                  handleChange={handleWorkoutChange}
                  buttonDataset={addWorkoutBtnDataset}
                />
              </div>
            </div>
          )}
          {splashNutrition && (
            <div className='absolute bg-slate-200 w-3/5 h-1/2 z-10'>
              <div className='px-10 py-3'>
                <p>Add New Nutrition</p>
                <Form
                  inputDataset={nutritionInputDataset}
                  handleChange={handleNutritionChange}
                  buttonDataset={addNutritionBtnDataset}
                />
              </div>
            </div>
          )}
          <div className='text-lg'>Workout</div>
          {workout ? (
            workout.map((data: WorkoutInterface) => {
              return (
                <div
                  key={data.id}
                  className='grow flex flex-col justify-evenly items-center w-5/6'
                >
                  <div className='border-2 border-slate-900 rounded-full w-24 h-24 m-auto'>
                    <div className='relative top-1/4'>
                      <p className='text-xl'>
                        {data.calories ? data.calories : 'No data'}
                      </p>
                      <small>Cals</small>
                    </div>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 w-full'>
                    <div>
                      <p>{data.distance_km ? data.distance_km : 'No data'}</p>
                      <small>Distance</small>
                    </div>
                    <div>
                      <p>{data.duration_min ? data.duration_min : 'No data'}</p>
                      <small>Duration</small>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No workout data</div>
          )}
        </div>
        <div className='flex flex-col justify-between items-center py-3 w-full md:w-1/2 h-full shadow-lg rounded text-center'>
          <div className='text-lg'>Nutrition</div>
          {nutrition ? (
            nutrition.map((data: NutritionInterface) => {
              return (
                <div
                  key={data.id}
                  className='grow flex flex-col justify-evenly items-center w-5/6'
                >
                  <div className='border-2 border-slate-900 rounded-full w-24 h-24 m-auto'>
                    <div className='relative top-1/4'>
                      <p className='text-xl'>
                        {data.calories ? data.calories : 'No data'}
                      </p>
                      <small>Cals</small>
                    </div>
                  </div>
                  <div className='flex flex-row justify-evenly items-center gap-x-3 w-full'>
                    <div>
                      <p>{data.protein ? data.protein : 'No data'}</p>
                      <small>Protein</small>
                    </div>
                    <div>
                      <p>{data.fat ? data.fat : 'No data'}</p>
                      <small>Fat</small>
                    </div>
                    <div>
                      <p>
                        {data.carbohydrates ? data.carbohydrates : 'No data'}
                      </p>
                      <small>Carbs</small>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No nutrition data</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Metrics;
