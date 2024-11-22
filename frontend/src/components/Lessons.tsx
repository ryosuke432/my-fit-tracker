import React from 'react';

const Lessons = () => {
  return (
    <div className='h-full md:ml-16 overflow-y-auto'>
      <div className='fixed flex flex-row justify-start items-center gap-x-5 bg-white h-12 w-full border-b border-slate-200'>
        <div className='flex flex-row justify-start items-center gap-x-3 ml-5'>
          <input
            type='text'
            name='search'
            placeholder='Search...'
            className='p-1 border border-slate-200 rounded-full'
          />
          <button type='button' className='bg-slate-300 w-16 rounded-full'>
            Go
          </button>
        </div>
        <div className='flex flex-row justify-start items-center gap-x-3'>
          <label htmlFor='sort'>Sort</label>
          <select
            name='sort'
            id='sort'
            className='w-40 p-1 bg-slate-100 border border-slate-500 rounded-full'
          >
            <option value='1'>Price</option>
            <option value='2'>Date</option>
            <option value='3'>Category</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:flex-wrap justify-start items-center gap-8 p-5 mt-10'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((number) => {
          return (
            <div className='flex flex-col justify-evenly items-center gap-y-1 p-2 text-center w-64 md:w-80 h-48 bg-slate-100 rounded-2xl hover:cursor-pointer'>
              <h3>Lesson #{number}</h3>
              <div className='flex flex-row justify-between items-center gap-x-5'>
                <small className='float-left'>Instructor #{number}</small>
                <small className='float-right'>$ {number * 100}</small>
              </div>
              <p className='text-start pl-1 overflow-hidden'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                deleniti, facere quos nihil consectetur nam. Nulla maxime quos
                in natus, similique quisquam fuga
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;
