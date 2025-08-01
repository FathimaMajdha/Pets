import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const topProductsSliderRef = useRef(null);
  const scrollAmount = 250;
  const navigate = useNavigate();

  return (
    <>
      <div className="container px-4 sm:px-10 pt-10">
        <div className="grid xl:grid-cols-2 gap-8 relative">
          <div className="relative">
            <img className="w-full h-[400px] sm:h-[350px] object-cover rounded-lg" src="dogcatimg.jpg" alt="body img" />
            <div className="absolute top-1/2 left-6 sm:left-16 -translate-y-1/2 space-y-2 sm:space-y-4 max-w-[90%] sm:max-w-[470px]">
              <p className="text-xl sm:text-4xl md:text-4xl font-bold text-yellow-600 mt-16 mb-10 ">
                Healthy. Tasty. Trusted.
              </p>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-yellow-100">
                Give Your Pets the Best – Naturally Healthy, Always Delicious!
              </h2>
              <div
                className="bg-accentDark hover:bg-accent text-white rounded-full w-fit flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base cursor-pointer"
                onClick={() => navigate("/dogfood")}
              >
                Shop Now <FaLongArrowAltRight />
              </div>
            </div>
            <img className="w-full h-[400px] sm:h-[350px] object-cover rounded-lg" src="petphoto.jpg " alt="body img" />
            <div className="absolute top-1/2 left-6 sm:left-16 -translate-y-1/2 space-y-2 sm:space-y-4 max-w-[90%] sm:max-w-[470px]"></div>
          </div>

          <div className="hidden sm:block relative h-[700px]">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl h-full w-full">
              <img className="w-full rounded-t-lg" src="Hero1.png" alt="body img" />
              <div className="px-4 py-6 sm:px-6 sm:py-10 text-center">
                <p className="text-lg sm:text-2xl text-gray-800 font-medium -mt-36">Starting At</p>
                <p className="text-xl sm:text-4xl text-yellow-600 font-semibold mt-2">$18.37</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black text-2xl sm:text-[39px] p-5 sm:p-10 text-center">
        <b>Shop for</b>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-evenly items-center gap-10 sm:gap-14">
          <div className="relative text-center font-devonshire w-[250px] mb-10">
            <div className="absolute -top-8 -left-10 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[-8deg]">
              Dry Dog Food
            </div>
            <div className="absolute -top-8 -right-10 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[8deg]">
              Wet Dog Food
            </div>
            <div className="absolute -bottom-10 left-0 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[4deg]">
              Puppy Food
            </div>
            <div className="absolute -bottom-10 right-0 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[-5deg]">
              James Beloved
            </div>
            <div className="absolute top-[45%] -left-16 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[10deg] hidden sm:block">
              Royal Canin
            </div>

            <button onClick={() => navigate("/dogfood")}>
              <img
                src="https://cdn.petsathome.com/public/images/assets/dog-category/dog-avatar.png"
                alt="Dog"
                className="w-[200px] h-[200px] mx-auto"
              />
              <div className="text-lg sm:text-2xl mt-2">Dog</div>
            </button>
          </div>

          <div className="relative text-center font-devonshire w-[250px]">
            <div className="absolute -top-8 -left-10 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[7deg]">
              Dry Cat Food
            </div>
            <div className="absolute -top-8 -right-10 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[-6deg]">
              Wet Cat Food
            </div>
            <div className="absolute -bottom-10 left-0 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[4deg]">
              James Beloved
            </div>
            <div className="absolute -bottom-10 right-0 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[10deg]">
              Caesar
            </div>
            <div className="absolute top-[45%] -left-16 p-2 sm:p-3 rounded-lg border border-black text-xs sm:text-sm shadow rotate-[-5deg] hidden sm:block">
              Royal Canin
            </div>

            <button onClick={() => navigate("/catfood")}>
              <img
                src="https://cdn.petsathome.com/public/images/assets/cat-category/cat-avatar.png"
                alt="Cat"
                className="w-[200px] h-[200px] mx-auto"
              />
              <div className="text-lg sm:text-2xl mt-2">Cat</div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-10">
        <b className="text-3xl">New and Featured</b>
        <div className="flex items-center mt-4">
          <div className="flex overflow-x-auto scroll-smooth max-w-full gap-4">
            {["06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"].map((src, i) => (
              <div key={i} className="min-w-[250px] sm:min-w-[400px] h-[200px] bg-[#222222] relative rounded-lg p-4">
                <button
                  onClick={() => navigate("/dogfood")}
                  className=" text-white text-[12px] sm:text-[16px] py-2 px-4 absolute bottom-4 left-4 rounded-[10px]"
                >
                  Shop Now
                </button>
                <div>
                  <p className="text-[16px] sm:text-[20px] text-yellow-100 mb-2">Save up to {10 + i * 10}%</p>
                  <p className="text-[18px] text-white">on selected item {i + 1}</p>
                </div>
                <img
                  className="w-[100px] sm:w-[150px] absolute top-4 right-4 rounded-[33px]"
                  src={src}
                  alt={`Product ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full bg-[#222222] overflow-hidden px-6 py-10 sm:py-0 sm:h-[500px] flex flex-col sm:flex-row">
        <div className="text-white flex-1 sm:mt-20">
          <h2 className="text-white font-devonshire text-2xl sm:text-3xl md:text-5xl">PetsFood</h2>
          <h1 className="text-3xl sm:text-[45px] mt-4">Sign Up. Start Saving.</h1>
          <p className="text-[16px] sm:text-[18px] mt-2">
            Don't miss out, join PetsFood now to unlock tailored offers just for you
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-black text-white py-3 px-6 rounded-[10px] text-[16px]"
            >
              Sign up for tailored offers
            </button>
            <button
              onClick={() => navigate("/dogfood")}
              className="border border-white text-white py-3 px-6 rounded-[10px] text-[16px]"
            >
              View Products
            </button>
          </div>
          <a href="/support" className="text-white underline mt-4 text-[18px]">
            Learn more
          </a>
        </div>

        <div className="hidden sm:flex flex-1 items-center justify-center relative w-[700px] h-full bg-white rounded-l-full overflow-hidden -mr-6">
          <div className="flex w-[650px] h-[250px] overflow-x-scroll gap-[16px] px-4 ml-10">
            {["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"].map((src, i) => (
              <div key={i} className="min-w-[250px] border border-black/30 rounded-lg p-[10px] relative bg-white">
                <button
                  onClick={() => navigate("/dogfood")}
                  className="underline text-[16px] p-[10px] px-[20px] absolute bottom-[20px] left-[10px]"
                >
                  Shop Now
                </button>
                <p className="text-[16px] text-red-700 mb-[90px]">Special Offer {i + 1}</p>
                <p className="text-[16px] text-gray-800">Exclusive deal</p>
                <img
                  className="w-[100px] absolute top-[60px] right-[36px] rounded-[36px]"
                  src={src}
                  alt={`Promo ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex overflow-x-auto gap-4 px-4 bg-[#222222]">
        {["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"].map((src, i) => (
          <div
            key={i}
            className="min-w-[250px] h-[200px] bg-white rounded-lg p-5 border border-black relative flex-shrink-0 mb-10 mt-2"
            onClick={() => navigate("/offers")}
          >
            <p className="text-lg  mb-2">Special Offer {i + 1}</p>
            <p className="text-md text-gray-800 mb-10">Exclusive deal</p>
            <img src={src} className="w-[100px] absolute top-4 right-4 rounded-full" alt={`Promo ${i + 1}`} />
            <button className="underline text-sm absolute bottom-4 left-4 text-[#222222]">Shop Now</button>
          </div>
        ))}
      </div>

      <div className="w-full px-0 sm:px-1">
        <b className="text-3xl px-4 sm:px-10">Top Products</b>
        <div className="flex items-center mt-5 mb-14">
          <button onClick={() => (topProductsSliderRef.current.scrollLeft -= scrollAmount)} className="px-2 text-2xl">
            <FaAngleLeft />
          </button>

          <div ref={topProductsSliderRef} className="flex overflow-x-auto scroll-smooth w-full gap-5 px-4 sm:px-10">
            {["11.jpg", "12.jpg", "13.jpg", "14.jpg", "13.jpg", "14.jpg", "14.jpg", "14.jpg"].map((src, i) => {
              const product = {
                id: 100 + i,
                productName: `Product ${i + 1}`,
                price: 1200 + i,
                imageUrl: src,
              };

              return (
                <div
                  key={product.id}
                  className="min-w-[250px] h-[420px] bg-[#222222] relative rounded-lg p-5 border border-black"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-36 absolute top-5 left-24 rounded-full"
                  />

                  <p className="text-lg text-white mt-[180px]">{product.productName}</p>
                  <p className="text-lg text-white">2kg</p>
                  <p className="text-lg text-white">Save ₹{i + 1} on this</p>
                  <b className="text-2xl text-yellow-100">₹{product.price}.00</b>
                  <span className="ml-2 text-white line-through">₹{1500 + i}.00</span>
                </div>
              );
            })}
          </div>

          <button onClick={() => (topProductsSliderRef.current.scrollLeft += scrollAmount)} className="px-2 text-2xl">
            <FaAngleRight />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
