import { FaUser } from "react-icons/fa";
import { MdAddBusiness, MdViewCompact, MdLogout } from "react-icons/md";
import { GiCube } from "react-icons/gi";

const Sidebar2 = () => {
  return (
    <div className="bg-gray-800 text-white fixed top-0 left-0 w-full md:w-96 md:h-full z-50 md:overflow-y-auto flex md:block justify-around items-center py-4 md:py-0">
      <h1 className="text-xl md:text-3xl font-bold md:ml-20">PetsFood</h1>
      <ul className="flex md:flex-col items-center md:items-start gap-6 md:gap-0 mt-0 md:mt-4 font-bold">
        <li>
          <a href="/dashboard">
            <button className="flex items-center gap-2 md:gap-6 md:ml-20 py-2 md:py-8">
              <MdViewCompact className="text-2xl" />
              <span className="hidden md:inline">Overview</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/users">
            <button className="flex items-center gap-2 md:gap-6 md:ml-20 py-2 md:py-8">
              <FaUser className="text-2xl" />
              <span className="hidden md:inline">Users</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/orders">
            <button className="flex items-center gap-2 md:gap-6 md:ml-20 py-2 md:py-8">
              <GiCube className="text-2xl" />
              <span className="hidden md:inline">Orders</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/products">
            <button className="flex items-center gap-2 md:gap-6 md:ml-20 py-2 md:py-8">
              <MdAddBusiness className="text-2xl" />
              <span className="hidden md:inline">Products</span>
            </button>
          </a>
        </li>
        <li>
          <a href="/login">
            <button className="flex items-center gap-2 md:gap-6 md:ml-20 py-2 md:py-8">
              <MdLogout className="text-2xl" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;
