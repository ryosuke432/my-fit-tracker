import React from 'react';

const Lessons = () => {
  const mock = [
    {
      title: 'Lesson 1',
      description: 'About Workout',
      price: 15,
      instructor: 'Instructor 1',
    },
    {
      title: 'Lesson 2',
      description: 'About Nutrition',
      price: 15,
      instructor: 'Instructor 2',
    },
    {
      title: 'Lesson 3',
      description: 'About Workout',
      price: 15,
      instructor: 'Instructor 3',
    },
    {
      title: 'Lesson 4',
      description: 'About Nutrition',
      price: 15,
      instructor: 'Instructor 4',
    },
    {
      title: 'Lesson 5',
      description: 'About Workout',
      price: 15,
      instructor: 'Instructor 5',
    },
  ];
  return (
    <div className='flex flex-col md:flex-row flex-wrap justify-start items-center gap-5 m-5 p-3'>
      {mock.map((lesson) => {
        return (
          <div className='flex flex-col justify-evenly items-center gap-y-1 text-center w-full md:w-1/4 h-1/3 md:h-1/4 bg-emerald-100 rounded-2xl hover:cursor-pointer'>
            <h3>{lesson.title}</h3>
            <div className='flex flex-row justify-between items-center gap-x-5'>
              <small className='float-left'>{lesson.instructor}</small>
              <small className='float-right'>$ {lesson.price}</small>
            </div>
            <p>{lesson.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Lessons;
