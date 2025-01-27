import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const newFeaturedSliderRef = useRef(null);
  const topProductsSliderRef = useRef(null);
  const scrollAmount = 400;

  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* Hero Section */}
        <div className="bg-red-100 flex ">
          <img className="w-full sm:w-[600px] sm:h-[600px] mt-[-20px]" src="/Hero1.png" alt="Hero Image" />
        </div>
        {/* First part */}
<div className=" py-8 sm:py-16 px-5 sm:px-20 lg:py-0 lg:px-0 ">
  <div className="relative flex flex-col items-center sm:items-start sm:w-[400px] sm:h-[600px] sm:mt-[-550px] sm:ml-[900px] sm:rounded-[30px]">
    <div className="text-center sm:text-left">
      <p className="text-[32px] sm:text-[46px] font-bold">Healthy Pets Foods</p>
      <p className="text-[24px] sm:text-[40px]">Starting At</p>
      <p className="text-[24px] sm:text-[46px] text-red-500 font-semibold">$18.37</p>
      <button
        onClick={() => { navigate('/offers') }}
        className="bg-gray-800 text-white mb-10 text-[16px] py-3 px-14 sm:px-14 hover:shadow-2xl rounded-[20px] cursor-pointer transition-all duration-300 sm:mt-[50px]"
      >
        Shop Now
      </button>
    </div>
  </div>
</div>


        {/* Second part */}
        <div className="bg-gray-800  -mt-12  text-white text-[24px] sm:text-[39px] p-5 sm:p-1 text-center">
          <b>Shop for</b>
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-evenly items-center gap-5 sm:gap-10">
            {/* Dog Button */}
            <button className="text-center" onClick={() => navigate("/dogfood")}>
              <img
                src="https://cdn.petsathome.com/public/images/assets/dog-category/dog-avatar.png"
                alt="Dog"
                className="w-[250px] sm:w-[250px] h-[250px] sm:h-[250px] mx-auto"
              />
              <div className="text-[18px] sm:text-[30px] mt-2">Dog</div>
            </button>

            {/* Cat Button */}
            <button className="text-center" onClick={() => navigate("/catfood")}>
              <img
                src="https://cdn.petsathome.com/public/images/assets/cat-category/cat-avatar.png"
                alt="Cat"
                className="w-[250px] sm:w-[250px] h-[250px] sm:h-[250px] mx-auto"
              />
              <div className="text-[18px] sm:text-[30px] mt-2">Cat</div>
            </button>
          </div>
        </div>
      </div>

      {/* Third Part */}
      <div className="p-4 sm:p-[40px]">
       
        <b className="text-3xl ">New and Featured</b>
        <div className="flex items-center mt-4 sm:mt-[20px]">
        

          {/* Scrollable container */}
          <div
            
            className="flex overflow-x-auto scroll-smooth max-w-full sm:max-w-[1600px] gap-4 sm:gap-[20px]"
          >
            <div className="flex overflow-x-auto gap-[10px]">
              {/* Repeat for remaining cards */}
              {[
                {
                  imgSrc: "06.jpg",
                  title: "Save up to 50%",
                  discount: " on selected cat food",
                },
                {
                  imgSrc: "07.jpg",
                  title: "Save up to 30% on",
                  discount: "wet dog foods",
                },
                {
                  imgSrc: "08.jpg",
                  title: "Save up to 40% on ",
                  discount: "selected adult Cat food",
                },
                {
                  imgSrc: "09.jpg",
                  title: "Save up to 20%",
                  discount: "for Cat wet food",
                },
                {
                  imgSrc: "10.jpg",
                  title: "Save up to 10%",
                  discount: "on Royal Canin Products",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="min-w-[250px] sm:min-w-[400px] h-[200px] bg-red-200 relative rounded-lg p-4 sm:p-[20px] mr-4 sm:mr-[20px]"
                >
                  <button onClick={()=>{
                    navigate("/offers")
                  }} className="bg-[#4CAF50] text-white text-[12px] sm:text-[16px] py-2 sm:py-[10px] px-4 sm:px-[20px] absolute bottom-4 sm:bottom-[20px] left-4 sm:left-[10px] border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#45a049]">
                    Shop Now
                  </button>
                  <div>
                    <p className="text-[16px] sm:text-[20px] text-red-900 mb-2 sm:mb-[10px]">{item.title}</p>
                    <p className="text-[30px] sm:text-[18px] text-gray-900">{item.discount}</p>
                  </div>
                  <img
                    className="w-[100px] sm:w-[150px] absolute top-4 sm:top-[20px] right-4 sm:right-[20px] rounded-[33px]"
                    src={item.imgSrc}
                    alt={`Product ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        
      </div>

      {/* Fourth part */}
      <div className="relative w-full sm:w-[1500px] h-[500px] bg-gray-800 rounded-[10px] overflow-hidden">
        {/* Left Side */}
        <div className="text-white font-devonshire text-3xl ml-16 mt-20 text-[64px]">PetsFood</div>
        <div className="ml-[50px] mt-[30px] text-white text-[50px]">
          Sign Up . Start Saving .
          <p className="text-[18px]">Don't miss out, join PetsFood now to unlock tailored offers just for you</p>
          <button onClick={()=>{
                    navigate("/register")
                  }} className="bg-green-500 text-white py-[10px] px-10 border-none rounded-[10px] text-[16px]">
            Sign up for tailored offers
          </button>
          <button onClick={()=>{
                    navigate("/offers")
                  }} className="bg-transparent text-white py-[12px] px-[12px] rounded-[10px] ml-[20px] border text-[16px]">
            View top offers
          </button>
        </div>
        <a href="/Support" className="text-white text-[22px] ml-64 underline mt-4 block">
          Learn more
        </a>

       
       {/* Right Side (Half Circle) */}
<div className="absolute left-1/2 transform -translate-x-1/2 sm:left-[80%] top-[-10px] sm:top-[-10px] w-full sm:w-[700px] md:w-[800px] h-[550px] bg-white rounded-l-full overflow-hidden hidden sm:block">
  <div className="flex absolute top-[120px] left-[55%] sm:left-[10%] md:left-[130px] w-full sm:w-[650px] md:w-[500px] h-[250px] overflow-x-scroll gap-[10px]">
    {/* Individual Image Cards */}
    {[
      {
        imgSrc: "01.jpg",
        title: "Save 15% on selected Royal Canin Dry Dog Food",
        description: "Valid until 28 january 25",
      },
      {
        imgSrc: "02.jpg",
        title: "Save 20% on selected Vitalin products",
        description: "Get best for pets health ",
      },
      {
        imgSrc: "03.jpg",
        title: "Save up to 5% for Food Sensitive Adult Dry Dog Food",
        description: "Valid until 30 April 2025",
      },
      {
        imgSrc: "04.jpg",
        title: "Save up to 20% for Dry Dog food chicken",
        description: "Valid until 22 April 2025",
      },
      {
        imgSrc: "05.jpg",
        title: "Save up to 10% Adult Dry Dog Food",
        description: "Exclusive discounts for members",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] border border-black/30 relative rounded-lg p-[10px] flex-shrink-0"
      >
        <button onClick={()=>{
            navigate("/offers")
          }} className=" text-gray underline text-[16px] p-[10px] px-[20px] absolute bottom-[20px] left-[10px] border-none rounded-[20px] cursor-pointer ">
          Shop Now
        </button>
        <div>
          <p className="text-[20px] sm:text-[16px] text-red-700 mb-[90px]">{item.title}</p>
          <p className="text-[18px] sm:text-[16px] text-gray-800">{item.description}</p>
        </div>
        <img
          className="w-[80px] sm:w-[100px] md:w-[120px] absolute top-[60px] right-[36px] rounded-[36px]"
          src={item.imgSrc}
          alt={`Product ${index + 1}`}
        />
      </div>
    ))}
  </div>
</div>

      </div>

      <div className="p-10">
        <b className="text-3xl">Top Products</b>
        <div className="flex items-center mt-5">
          {/* Left navigation button */}
          <button
              className="bg-green-500 text-white border-none rounded-full w-12 h-12 flex justify-center items-center cursor-pointer mr-2"
              onClick={() => {
                topProductsSliderRef.current.scrollLeft -= scrollAmount;
              }}
            >
              <FaAngleLeft className="w-6 h-6" />
            </button>

          {/* Scrollable container */}
          <div
              ref={topProductsSliderRef}
              className="flex overflow-x-auto scroll-smooth max-w-screen-xl gap-5"
            >
            {/* First card */}
            <div onClick={()=>{
                    navigate("/all")
                  }} className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
              <div>
                <p className="text-lg text-black mt-[180px]">
                  Hill's Prescription Diet k/d + Mobility Dry Adult Cat Food with Chicken 1.5kg
                </p>
                <p className="text-lg text-gray-700 ">1.5kg</p>
                <br />
                <br />

                <a href="#" className="text-lg  text-red-500">
                  Save £1 On this
                </a>
                <br />
                <b className="text-2xl text-[#1B1833]">£8.00</b>
                <span className="ml-2 text-gray-500 line-through">£9.00</span>
              </div>
              <img className="w-36 absolute top-5 left-24 rounded-full" src="11.jpg" alt="Product" />
            </div>

            {/* Second card */}
            <div  onClick={()=>{
                    navigate("/all")
                  }} className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
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
            <div  onClick={()=>{
                    navigate("/all")
                  }} className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
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

            <div  onClick={()=>{
                    navigate("/all")
                  }} className="min-w-[350px] h-[500px] bg-white relative rounded-lg p-5 border border-black mr-5">
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
          {/* Right navigation button */}
          <button
              className="bg-green-500 text-white border-none rounded-full w-12 h-12 flex justify-center items-center cursor-pointer ml-2"
              onClick={() => {
                topProductsSliderRef.current.scrollLeft += scrollAmount;
              }}
            >
              <FaAngleRight className="w-6 h-6" />
            </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
