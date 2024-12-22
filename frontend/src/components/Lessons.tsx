import React, { useState, useEffect } from 'react';

interface LessonInterface {
  id: string;
  title: string;
  instructor: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
  createdAt: Date;
}

const initialLessons: LessonInterface[] = [
  {
    id: 'lesson1',
    title: '30 min Club Bangers Run',
    instructor: 'Alex Toussaint',
    price: 120,
    description:
      "Join Alex Toussaint for the 30 min Club Bangers Run and immerse yourself in an energetic workout. This theme run features a hip-hop/rap playlist that transforms your exercise into a lively party. Designed to target your calves, hamstrings, and quads, this session is both engaging and effective. With Alex at the helm, you'll enjoy a unique and motivating experience. Get ready to run to the beat and feel the rhythm in every step.",
    category: 'Running',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/4e293f32a92c115eec758d80753a8509d4aaba3f/img_1716420920_4f2c5e44e0c846e7b4ef8f3faea16d8f.png',
    createdAt: new Date('2024-05-22'),
  },
  {
    id: 'lesson2',
    title: '20 min HIIT Run',
    instructor: 'Joslyn Thompson',
    price: 100,
    description:
      'Join Joslyn Thompson Rule for the 20 min HIIT Run, an intervals running class designed to improve heart health, build endurance, strength, and speed. This session features high intensity interval training with bursts of effort followed by active recovery. The class focuses on working your quads, hamstrings, and calves. Enjoy an energizing workout set to electronic music. This class is perfect for those looking for an efficient and effective run.',
    category: 'Running',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/fa71e2cb9063df5fd0643927af739bac3ba3d9fb/img_1718736980_7652733de6f748b3b8bb4978fd012e60.jpg',
    createdAt: new Date('2024-06-18'),
  },
  {
    id: 'lesson3',
    title: '30 min Intervals Run',
    instructor: 'Olivia Amato',
    price: 120,
    description:
      "Join Olivia Amato for the 30 min Intervals Run and work on your strength and endurance. This intervals running class features bursts of effort followed by active recovery while running on the Tread. The class will target your hamstrings, quads, and calves, ensuring a comprehensive lower body workout. Enjoy an invigorating session set to electronic music that will keep you motivated throughout. Don't miss the chance to challenge yourself with this engaging and dynamic run.",
    category: 'Running',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/2e81e84c6e7844824868e3c405464aba9d4b4763/img_1719228988_3c92a001e8cd420d9630dbcfc97db0c9.png',
    createdAt: new Date('2024-06-24'),
  },
  {
    id: 'lesson4',
    title: '60 min Power Zone Ride',
    instructor: 'Denis Morton',
    price: 150,
    description:
      'Join Denis Morton for the 60 min Power Zone Ride. Train smart with 7 zones of output customized to your fitness level. This class targets performance improvements in zones 3-6 on the power zone training scale of 1-7. Enjoy alternative music as you work through this structured session. Get ready to engage your glutes, hamstrings, and quads in this power zone class.',
    category: 'Cycling',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/a07646f34f890d142638e47ef0cee8f481253003/img_1718145239_0e61ecea09d94baa866c33e5a3813928.png',
    createdAt: new Date('2024-06-11'),
  },
  {
    id: 'lesson5',
    title: '20 min Power Walk',
    instructor: 'Marcel Dinkins',
    price: 100,
    description:
      "Join Marcel Dinkins for a 20 min Power Walk. Pick up the pace and get your body moving in this power walking class. Enjoy a selection of pop music as you walk. This class focuses on working your calves, hamstrings, and quads. Don't miss this opportunity to energize your day with Marcel.",
    category: 'Walking',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/3658a827a64eccf5b26c65be78b35b6336f2112d/img_1718063214_b65d95b2593f4355bac60e563e8582e1.png',
    createdAt: new Date('2024-06-10'),
  },
  {
    id: 'lesson6',
    title: '15 min Lower Body Stretch',
    instructor: 'Hannah Corbin',
    price: 50,
    description:
      "Join Hannah Corbin for the 15 min Lower Body Stretch. This class focuses on recovery, providing a comprehensive lower-body stretch to prepare you for your next workout. It's designed to help your muscles recover effectively. The session lasts 15 minutes, making it easy to fit into your schedule. Get ready to enhance your flexibility and recovery with Hannah's guidance.",
    category: 'Stretching',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/e9370ec40a5fcfe783fe9bdf5daa39d8b59303fd/img_1615480215_7269ffd305a94b5096e86526bc6ace2b.png',
    createdAt: new Date('2021-06-03'),
  },
  {
    id: 'lesson7',
    title: '30 min Morning Mobility',
    instructor: 'Kirra Michel',
    price: 50,
    description:
      'Start your day off right with 30 minutes of targeted movement with Kirra. This class will focus on the whole body.',
    category: 'Stretching',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/06eb559d2c9c1cf700b46888b7a90e7be0622b21/img_1726771761_e75d314bb8f244da9979f3e2d6bbea5c.png',
    createdAt: new Date('2024-11-21'),
  },
  {
    id: 'lesson8',
    title: '10 min HIIT Cardio [intermediate]',
    instructor: 'Ben Alldis',
    price: 150,
    description:
      'Join the 10 min HIIT Cardio class with instructor Ben Alldis. This intermediate-level workout is designed to increase strength and endurance. Focus on your quads, glutes, and calves as you power through this HIIT cardio session. The class features electronic music to keep you motivated. Get ready for a dynamic and effective workout.',
    category: 'Cardio',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/ec7bc02bc57c9f0ddb79411dbf38286014075155/img_1719226520_2c93454e34ed454aab3a0dfcceddfb48.jpg',
    createdAt: new Date('2024-06-24'),
  },
  {
    id: 'lesson9',
    title: '20 min Pop Punk Shadowboxing [advanced]',
    instructor: 'Kendall Toole',
    price: 150,
    description:
      "Join the fight with Peloton Boxing in the 20 min Pop Punk Shadowboxing class. In this advanced-level session, instructor Kendall Toole will guide you through perfecting your punches. The class features rock music to keep you energized throughout the workout. This shadowboxing class primarily targets your core, obliques, and hips. Get ready to enhance your boxing skills with Kendall's expert guidance.",
    category: 'Cardio',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/2d38581101c04ba119bcdeff028aa08f1d3093b2/img_1717692904_2f77421c3be1487a922863e1b4172ddc.png',
    createdAt: new Date('2024-06-06'),
  },
  {
    id: 'lesson10',
    title: '20 min USHER Dance Cardio [intermediate]',
    instructor: 'Ally & Emma',
    price: 130,
    description:
      "Join Ally & Emma for 20 min USHER Dance Cardio, an intermediate-level dance cardio class. This 20 minutes session is choreographed by Usher and his choreographer, Jamaica Craft, specifically for Ally & Emma. Break it down and break a sweat as you move to the rhythm of Usher's beats. Stick around to the end for a special surprise! Whether you're looking to improve your dance moves or get a good workout, this class has you covered.",
    category: 'Cardio',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/466c1efdd9a0795685be77ecb1cf2c6eaabf92e2/img_1633431198_1d3ee9f3d1664b4cbebf1059262f7456.png',
    createdAt: new Date('2021-07-06'),
  },
  {
    id: 'lesson11',
    title: '30 min Power Zone Endurance Pop Ride',
    instructor: 'Olivia Amato',
    price: 100,
    description:
      'Join Olivia Amato for the 30 min Power Zone Endurance Pop Ride. This power zone class focuses on building aerobic endurance through intervals in zones 2 and 3. Train smart with 7 zones of output customized to your fitness level. Enjoy a pop music soundtrack as you work out. This class targets your glutes, hamstrings, and quads.',
    category: 'Cycling',
    imgUrl:
      'https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_392/https://s3.amazonaws.com/peloton-ride-images/9a74120d525cd6aca53f7df1f95d18b42b5d9f5e/img_1718879827_c311d9e58dd74efc8e60389d5541a335.png',
    createdAt: new Date('2024-06-20'),
  },
];

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonInterface[]>(initialLessons);
  const [copiedLessons, setCopiedLessons] =
    useState<LessonInterface[]>(initialLessons);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<string>('');
  const [sortByDate, setSortByDate] = useState<string>('');

  useEffect(() => {
    filterAndSortLessons();
  }, [search, filter, sortByPrice, sortByDate]);

  const handleChange: handleChangeProp = (e) => {
    const { value } = e.target;
    setSearch(value.trim().toLowerCase());
  };

  const searchLessons = (lesson: LessonInterface) => {
    return (
      lesson.title.toLowerCase().includes(search) ||
      lesson.instructor.toLowerCase().includes(search) ||
      lesson.description.toLowerCase().includes(search) ||
      lesson.category.toLowerCase().includes(search)
    );
  };

  const filterLessons = (lesson: LessonInterface) => {
    switch (filter) {
      case 'Running':
        return lesson.category === 'Running';
      case 'Cycling':
        return lesson.category === 'Cycling';
      case 'Walking':
        return lesson.category === 'Walking';
      case 'Stretching':
        return lesson.category === 'Stretching';
      case 'Cardio':
        return lesson.category === 'Cardio';
      default:
        return true;
    }
  };

  const sortLessonsByPrice = (a: LessonInterface, b: LessonInterface) => {
    switch (sortByPrice) {
      case 'lowest':
        return a.price - b.price;
      case 'highest':
        return b.price - a.price;
      default:
        return 0;
    }
  };

  const sortLessonsByDate = (a: LessonInterface, b: LessonInterface) => {
    switch (sortByDate) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      default:
        return 0;
    }
  };

  const filterAndSortLessons = () => {
    const edited = [...lessons]
      .filter(searchLessons)
      .filter(filterLessons)
      .sort(sortLessonsByPrice)
      .sort(sortLessonsByDate);
    setCopiedLessons(edited);
  };

  return (
    <div className='h-full md:ml-16 overflow-y-auto'>
      <div className='fixed flex flex-row justify-start items-center gap-x-5 ml-5 bg-white h-12 w-full border-b border-slate-200'>
        <input
          type='text'
          name='search'
          placeholder='Search...'
          className='p-1 border border-slate-200 rounded-full'
          onChange={(e) => handleChange(e)}
        />

        <select
          className='p-1 border border-slate-200 rounded-full'
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value=''>All</option>
          <option value='Running'>Running</option>
          <option value='Cycling'>Cycling</option>
          <option value='Walking'>Walking</option>
          <option value='Stretching'>Stretching</option>
          <option value='Cardio'>Cardio</option>
        </select>

        <select
          className='p-1 border border-slate-200 rounded-full'
          onChange={(e) => setSortByPrice(e.target.value)}
          defaultValue=''
          disabled={sortByDate ? true : false}
        >
          <option value=''>Price</option>
          <option value='lowest'>$ &#8594; $$$</option>
          <option value='highest'>$$$ &#8594; $</option>
        </select>

        <select
          className='p-1 border border-slate-200 rounded-full'
          onChange={(e) => setSortByDate(e.target.value)}
          defaultValue=''
          disabled={sortByPrice ? true : false}
        >
          <option value=''>Date</option>
          <option value='newest'>Newest</option>
        </select>
      </div>

      <div className='flex flex-col md:flex-row md:flex-wrap justify-start items-center gap-8 p-5 mt-10'>
        {copiedLessons.map((lesson) => {
          return (
            <div
              key={lesson.id}
              className='flex flex-col justify-evenly items-center gap-y-1 p-2 text-center w-64 md:w-80 h-48 bg-slate-100 rounded-2xl hover:cursor-pointer'
            >
              <h3>{lesson.title}</h3>
              <div className='flex flex-row justify-start items-center gap-x-5'>
                <small>{lesson.category}</small>
                <small>{lesson.instructor}</small>
                <small>{lesson.createdAt.toISOString().split('T')[0]}</small>
                <small>$ {lesson.price}</small>
              </div>
              <p className='text-start pl-1 overflow-hidden'>
                {lesson.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;
