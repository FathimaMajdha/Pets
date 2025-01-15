import React,{useRef} from "react";
import { TiRefreshOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import Footer from "../Components/Footer";


const CatFood = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 5000;

  

  const scrollUp = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
    }
  };

  
  return (
    <div>
      <div className="">
        <img
          className=" w-[1500px] h-[400px]"
          src="https://breedingbusiness.com/wp-content/uploads/2022/09/best-dog-foods-for-poodles.jpg"
          alt="Dog Food image"
        />
      </div>

      <div className="w-[400px] h-[500px] absolute  mt-[-550px] ml-[900px] rounded-[30px]">
        <div className="ml-[-800px] mt-80">
        
          <b className="text-[46px] text-white ">Cat Foods</b>
        </div>
      </div>
      <div className="flex h-44">
        <div className="mt-8 ml-10">
          <a href="/drydogfood" className="border shadow-xl border-gray-800/72 px-10 py-2  rounded-[20px]">Dry Cat Food</a>
          <a href ="/wetdogfood" className="border shadow-xl border-gray-800/72 px-10 py-2  rounded-[20px]">Wet Cat Food</a>
          <button className="border shadow-xl border-gray-800/72 px-10 py-2  rounded-[20px]">Cat Food for health conditions</button>
          <button className="border shadow-xl border-gray-800/72 px-10 py-2  rounded-[20px]">Vet Recommended Cat Food</button>
          <button className="border shadow-xl border-gray-800/72 px-10 py-2  rounded-[20px]">Hypoallergenic Cat Food</button>
          
        </div>
      </div>

      <div
        ref={sliderRef}
        className="overflow-y-auto scroll-smooth max-w-screen gap-[20px]"
        style={{ maxHeight: "500px" }}
      >
     
      {/* first row */}
      <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black -mr-6">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>
        
      
      <div className="flex pb-10 ml-12">
        <div className="w-[270px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
      </div>
    </div>
    {/* second row */}
    <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
         
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>
      
      <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
      </div>
    </div>

    {/* third row */}
    <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>
      
      <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
      </div>
    </div>
    
    {/* fourth row */}
    <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>
      
      <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
      </div>
    </div>

    {/* fifth row */}
    <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          <button className="bg-blue-600 flex text-white  px-1 absolute bottom-6 left-5 rounded-[5px] cursor-pointer ">
            <TiRefreshOutline className="mt-1 " /> easy-repeat
          </button>
          <button className="bg-violet-400/10 ml-28 text-violet-400  px-1 absolute bottom-6 left-3 rounded-[2px] cursor-pointer ">
            {" "}
            save 5%
          </button>
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>

        <div className="w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
          
          <div>
            <p className="text-lg text-black mt-[180px]">
              Pets at Home Summer Pocket Size Dog Poop Bags 120 Pack Multi Coloured
            </p>
            <p className="text-lg text-gray-700">100 pack</p>
            <br />
            <a href="#" className="text-lg text-red-500">
              Save £1 On Pets At Home Summer Dog...
            </a>
            <br />
            <b className="text-2xl text-[#1B1833]">£2.00</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-36 absolute top-5 left-24 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_23560.jpg"
            alt="Product"
          />
        </div>
      
      <div className="flex pb-10 ml-12">
        <div className="w-[300px] h-[500px]  bg-white relative rounded-lg p-5 border border-black/25 mr-5">
          <div>
            <p className="text-lg text-black mt-[180px]">Pooch & Mutt Slim & Slender Dry Dog Food Chicken</p>
            <div className="flex w-28">
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            2 reviews
            <p className="text-lg text-gray-700">10 kg</p>
            <br />
            <br />
            <br />
            <br />
            <b className="text-2xl text-[#1B1833]">£59.99</b>
            <span className="ml-2 text-gray-500 line-through">£3.00</span>
          </div>
          <img
            className="w-40 absolute top-5 left-16 rounded-full"
            src="https://cdn.petsathome.com/public/images/products/900_7116142P.jpg"
            alt="Product"
          />
        </div>
      </div>
    </div>
    <div className="flex justify-end -mt-32">
        <button
          className=" py-6 rounded-full"
          onClick={scrollUp}
        >
          <FaLongArrowAltUp className="text-xl" />
        </button>
        
      </div>
      <div>
      <Footer/>
      </div>
      
    </div>
    </div>
  );
};

export default CatFood;
