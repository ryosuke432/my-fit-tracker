import axiosInstance from '../api/axiosInstance';

export const addWorkout = async (data: WorkoutInterface) => {
  try {
    if (!data) return;
    await axiosInstance.post('/v1/member/workout', data);
  } catch (err) {
    console.error(err);
  }
};

export const addNutrition = async (data: NutritionInterface) => {
  try {
    if (!data) return;
    await axiosInstance.post('/v1/member/nutrition', data);
  } catch (err) {
    console.error(err);
  }
};
