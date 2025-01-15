import React, { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // Import icons for the left and right buttons

const Offers = () => {
  const topProductsSliderRef = useRef(null);
  const scrollAmount = 500; 

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
      <div className="text-center mb-8">
        <b className="text-3xl">Offers Today</b>
      </div>

      
      <div className="flex items-center mt-5">
       
        <button
          className="bg-green-500 text-white border-none rounded-full w-12 h-12 flex justify-center items-center cursor-pointer mr-2"
          onClick={() => {
            topProductsSliderRef.current.scrollLeft -= scrollAmount;
          }}
        >
          <FaAngleLeft className="w-6 h-6" />
        </button>

       
        <div
          ref={topProductsSliderRef}
          className="flex overflow-x-auto scroll-smooth max-w-screen-xl gap-5"
        >
          {/* First card */}
          <div className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
            <div>
              <p className="text-lg text-black mt-[180px]">
                Hill's Prescription Diet k/d + Mobility Dry Adult Cat Food with Chicken 1.5kg
              </p>
              <p className="text-lg text-gray-700">1.5kg</p>
              <br />
              <br />
              <a href="#" className="text-lg text-red-500">
                Save £1 On this
              </a>
              <br />
              <b className="text-2xl text-[#1B1833]">£8.00</b>
              <span className="ml-2 text-gray-500 line-through">£9.00</span>
            </div>
            <img className="w-36 absolute top-5 left-24 rounded-full" src="11.jpg" alt="Product" />
          </div>

          {/* Second card */}
          <div className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
            <div>
              <p className="text-lg text-black mt-[180px]">
                Taste of the Wild Rocky Mountain Grain Free Dry Cat Food Venison & Salmon
              </p>
              <p className="text-lg text-gray-700">2kg</p>
              <br />
              <a href="#" className="text-lg text-red-500">
                Save £1 on this
              </a>
              <br />
              <b className="text-2xl text-[#1B1833]">£14.40</b>
              <span className="ml-2 text-gray-500 line-through">£15.00</span>
            </div>
            <img className="w-36 absolute top-5 left-28 rounded-full" src="12.jpg" alt="Product" />
          </div>

          {/* Third card */}
          <div className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
            <div>
              <p className="text-lg text-black mt-[180px]">
                Vet's Kitchen Sensitive Care Adult Dry Dog Food Pork & Potato
              </p>
              <p className="text-lg text-gray-700">2kg</p>
              <br />
              <a href="#" className="text-lg text-red-500">
                Save £10
              </a>
              <br />
              <b className="text-2xl text-[#1B1833]">£35.00</b>
              <span className="ml-2 text-gray-500 line-through">£45.00</span>
            </div>
            <img className="w-36 absolute top-5 left-28 rounded-full" src="13.jpg" alt="Product" />
          </div>

          {/* Fourth card */}
          <div className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
            <div>
              <p className="text-lg text-black mt-[180px]">James Wellbeloved Senior Dry Dog Food Fish & Rice</p>
              <p className="text-lg text-gray-700">100 pack</p>
              <br />
              <a href="#" className="text-lg text-red-500">
                Save £10
              </a>
              <br />
              <b className="text-2xl text-[#1B1833]">£23.90</b>
              <span className="ml-2 text-gray-500 line-through">£33.90</span>
            </div>
            <img className="w-36 absolute top-5 left-28 rounded-full" src="14.jpg" alt="Product" />
          </div>
        </div>

        
        <button
          className="bg-green-500 text-white border-none rounded-full w-12 h-12 flex justify-center items-center cursor-pointer ml-2"
          onClick={() => {
            topProductsSliderRef.current.scrollLeft += scrollAmount;
          }}
        >
          <FaAngleRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Offers;
