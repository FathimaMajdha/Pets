import { FaUser, FaUserShield } from "react-icons/fa";
import { MdAddBusiness, MdViewCompact, MdLogout } from "react-icons/md";
import { GiCube } from "react-icons/gi";

const Sidebar2 = () => {
  return (
    <div className="bg-gray-800 text-white fixed top-0 left-0 w-full md:w-72 h-24 md:h-full z-50 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start px-4 md:px-0 md:overflow-y-auto">
      
     
      <div className="flex flex-col items-center justify-center py-4 md:py-10 w-full">
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full animate-spin bg-gradient-to-tr from-gray-500 via-indigo-500 to-green-400 p-1">
            <div className="w-full h-full bg-gray-800 rounded-full"></div>
          </div>
          <div className="relative z-10 bg-white border-4 rounded-full p-2">
            <FaUserShield className="text-3xl md:text-4xl text-gray-800" />
          </div>
          <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-gray-800 w-3 h-3 rounded-full z-20"></span>
        </div>
        <p className="mt-2 text-white font-devonshire text-2xl hidden md:block">PetsFood</p>
        <p className="mt-2 text-white font-semibold hidden md:block">Admin Dashboard</p>
      </div>

      
      <hr className="border-gray-600 w-full mx-auto my-2 md:hidden" />

      
      <ul className="flex flex-row md:flex-col justify-evenly md:justify-start items-center md:items-start w-full md:w-auto gap-4 md:gap-0 text-sm font-semibold pb-2 md:pb-0">
        <li>
          <a href="/dashboard">
            <button className="flex flex-col md:flex-row items-center md:gap-4 py-2 md:py-6 md:pl-6">
              <MdViewCompact className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Overview</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/users">
            <button className="flex flex-col md:flex-row items-center md:gap-4 py-2 md:py-6 md:pl-6">
              <FaUser className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Users</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/orders">
            <button className="flex flex-col md:flex-row items-center md:gap-4 py-2 md:py-6 md:pl-6">
              <GiCube className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Orders</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/products">
            <button className="flex flex-col md:flex-row items-center md:gap-4 py-2 md:py-6 md:pl-6">
              <MdAddBusiness className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Products</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/login">
            <button className="flex flex-col md:flex-row items-center md:gap-4 py-2 md:py-6 md:pl-6">
              <MdLogout className="text-xl md:text-2xl" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;
