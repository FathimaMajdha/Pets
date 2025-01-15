import React, { useRef, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const Sidebar = ({ closeSidebar }) => {
  const dogFoodRef = useRef(null);
  const catFoodRef = useRef(null);
  const offersRef = useRef(null);
  const scrollAmount = 400;

  
  useEffect(() => {
   
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='w-96 bg-white fixed h-full top-0 left-0 z-50 overflow-y-auto'>
      <div className="p-4">
        <button
          onClick={closeSidebar}
          className="text-black text-xl float-right p-4 hover:text-red-500"
        >
          Close
        </button>
        <h1 className='text-2xl text-gray-800 font-bold text-center'>Shop by Pet</h1>
      </div>

      <ul className='mt-3 text-gray-800 font-bold'>
        <li className='mb-2 rounded py-2'>
          <a href="/offers" className='px-3'>
            Offers
            <div
              ref={offersRef}
              className="flex overflow-x-auto scroll-smooth max-w-[1200px] gap-[20px]"
            />
            <button
              className="text-gray border-none rounded-full w-[30px] h-[30px] flex justify-center items-center cursor-pointer ml-[340px]"
              onClick={() => {
                offersRef.current.scrollLeft += scrollAmount;
              }}
            >
              <FaAngleRight className="w-[24px] h-[24px]" />
            </button>
          </a>
          <hr />
        </li>

        <li className='mb-2 rounded py-2'>
          <a href="/dogfood" className='px-3'>
            Dog Food
            <div
              ref={dogFoodRef}
              className="flex overflow-x-auto scroll-smooth max-w-[1200px] gap-[20px]"
            />
            <button
              className="text-gray border-none rounded-full w-[30px] h-[30px] flex justify-center items-center cursor-pointer ml-[340px]"
              onClick={() => {
                dogFoodRef.current.scrollLeft += scrollAmount;
              }}
            >
              <FaAngleRight className="w-[24px] h-[24px]" />
            </button>
          </a>
          <hr />
        </li>

        <li className='mb-2 rounded py-2'>
          <a href="/catfood" className='px-3'>
            Cat Food
            <div
              ref={catFoodRef}
              className="flex overflow-x-auto scroll-smooth max-w-[1200px] gap-[20px]"
            />
            <button
              className="text-gray border-none rounded-full w-[30px] h-[30px] flex justify-center items-center cursor-pointer ml-[340px]"
              onClick={() => {
                catFoodRef.current.scrollLeft += scrollAmount;
              }}
            >
              <FaAngleRight className="w-[24px] h-[24px]" />
            </button>
          </a>
          <hr />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
