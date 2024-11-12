import React, { SetStateAction } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const WorkoutDetails = ({
  workout,
  fetchWorkout,
  fetchDailyWorkout,
  fetchWeeklyWorkout,
  setFlipWorkout,
}: {
  workout: WorkoutInterface[];
  fetchWorkout: () => Promise<void>;
  fetchDailyWorkout: () => Promise<void>;
  fetchWeeklyWorkout: () => Promise<void>;
  setFlipWorkout: React.Dispatch<SetStateAction<number>>;
}) => {
  const handleDelete = async (id: string) => {
    try {
      const { status } = await axiosInstance.delete(`v1/member/workout/${id}`);
      if (status === 200) console.log('Successfully deleted!');
    } catch (err) {
      console.error(err);
    } finally {
      fetchWorkout();
      fetchDailyWorkout();
      fetchWeeklyWorkout();
    }
  };
  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Workout</h3>
        <button type='button' onClick={() => setFlipWorkout(0)}>
          <X size={16} />
        </button>
      </div>

      <div className='grow flex flex-col justify-start items-center gap-y-2 w-11/12 overflow-auto'>
        <table>
          <tbody>
            {workout?.map((data: WorkoutInterface) => {
              return (
                <tr key={data.id}>
                  <th>
                    {data.createdAt?.toString().slice(5, 10).replace('-', '/')}
                  </th>
                  <td>{data.name}</td>
                  <td>{data.distance_km} km</td>
                  <td>{data.duration_min} min</td>
                  <td>{data.calories} cal</td>
                  <td>
                    <button type='button' onClick={() => console.log('update')}>
                      <Pencil size={16} className='hover:cursor-pointer' />
                    </button>
                  </td>
                  <td>
                    <button
                      type='button'
                      onClick={() => handleDelete(data.id?.toString() ?? '')}
                    >
                      <Trash2
                        size={16}
                        color='red'
                        className='hover:cursor-pointer'
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkoutDetails;
