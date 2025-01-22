import React from 'react';
import {useNavigate} from 'react-router-dom'

const ResultNotFound = () => {
    const navigate=useNavigate()
  return (
    <div>
    <p className='flex justify-center mt-20 text-2xl'>Oops!<br/></p>
    <div className='flex justify-center mt-20'>
       
      <p><span className='text-4xl flex justify-center text-gray-800'>Results Not Found</span>
        <br/> Sorry, we couldn't find the product you were looking for. Please try again with a different product.</p>
       
    </div>
    <button onClick={()=>navigate('/')} className='mt-20 ml-96 bg-blue-600 text-white px-6 py-1 rounded'>Return Back</button>
    </div>
  );
};

export default ResultNotFound;
