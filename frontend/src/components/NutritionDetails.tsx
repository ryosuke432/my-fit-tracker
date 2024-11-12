import React, { SetStateAction } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const NutritionDetails = ({
  nutrition,
  setFlipNutrition,
}: {
  nutrition: NutritionInterface[];
  setFlipNutrition: React.Dispatch<SetStateAction<number>>;
}) => {
  const handleDelete = async (e: React.HTMLAttributes<HTMLButtonElement>) => {
    // const { id } = e.id;

    try {
      const { data, status } = await axiosInstance.delete(
        `/v1/member/nutrition/`
      );
      if (status === 200) console.log('Successfully deleted!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='flex flex-row justify-around items-center gap-x-3'>
        <h3>Nutrition</h3>
        <button type='button' onClick={() => setFlipNutrition(0)}>
          <X size={16} />
        </button>
      </div>

      <div className='grow flex flex-col justify-start items-center w-11/12 scroll-auto'>
        <table>
          <thead>
            <tr>
              <th colSpan={3}></th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
            </tr>
          </thead>
          <tbody>
            {nutrition?.map((data: NutritionInterface) => {
              return (
                <tr key={data.id} id={`${data.id}`}>
                  <th>
                    {data.createdAt?.toString().slice(5, 10).replace('-', '/')}
                  </th>
                  <td>{data.name}</td>
                  <td>{data.calories} cal</td>
                  <td>{data.protein} g</td>
                  <td>{data.fat} g</td>
                  <td>{data.carbohydrates} g</td>
                  <td>
                    <button type='button' onClick={() => console.log('update')}>
                      <Pencil size={16} className='hover:cursor-pointer' />
                    </button>
                  </td>
                  <td>
                    <button
                      id='test'
                      type='button'
                      onClick={(e) => console.log(e)}
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

export default NutritionDetails;
