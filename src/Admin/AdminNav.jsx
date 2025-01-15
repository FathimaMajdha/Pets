import React, { useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdOutlineAccountCircle} from 'react-icons/md'


const AdminNav = () => {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim();
    if (input) {
      handleItemClick(input);
    }
    e.target.reset(); 
  };
  

  return (
    <div>
      <div className="flex items-center ml-4 mt-10 sm:ml-8 lg:ml-12">
        <Link to="/" className="text-gray-800 font-devonshire text-2xl sm:text-3xl md:text-4xl">
          PetsFood
        </Link>
        <div className="relative ml-4 sm:ml-8 md:ml-60 flex-grow">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="bg-white w-full sm:w-[400px] md:w-[500px] lg:w-[600px] px-4 py-3 text-black border border-gray-300 rounded-lg pl-10"
            />
            <button
              type="submit"
              className="absolute left-5 top-6 transform -translate-y-1/2 text-gray-500"
              aria-label="Search"
            >
              <BsSearch />
            </button>
          </form>
        </div>
        <div>
            <div >
            <button>
                <FaBell className="text-2xl"/>
            </button>
            </div>
            <div className="ml-20 mr-40 -mt-10">
            <button >
              <MdOutlineAccountCircle className="text-4xl" />
            </button>
            </div>
        </div>
      </div>
     
    </div>
  );
};

export default AdminNav;
