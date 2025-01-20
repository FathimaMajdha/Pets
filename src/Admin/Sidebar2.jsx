import { FaUser } from "react-icons/fa";
import { MdAddBusiness, MdViewCompact , MdLogout} from "react-icons/md";
import { GiCube } from "react-icons/gi";

const Sidebar2 = () => {

  return (
    <div className='w-96 bg-gray-800 text-white fixed h-full top-0 left-0 z-50 overflow-y-auto'>
      <div className="p-4">
       <h1 className="ml-20 font-devonshire text-2xl sm:text-3xl md:text-5xl">PetsFood</h1>
      </div>

      <ul className='mt-3  font-bold '>
        <li className=''>
          <a href="/dashboard">
            <button
              className=" flex justify-center items-center gap-6 ml-20 py-8 "
            ><span><MdViewCompact className='text-4xl'/></span>
                  OverView
            </button>
          </a>
          <hr className='border-white/10'/>
        </li>

        <li >
          <a href="/users">
            <button
              className=" flex justify-center items-center gap-6 ml-20 py-8"
            ><span><FaUser className='text-2xl'/></span>
                  Users
            </button>
          </a>
          <hr className='border-white/10'/>
        </li>
        <li >
          <a href="/orders">
            <button
              className=" flex justify-center items-center gap-6 ml-20 py-8"
            ><span><GiCube className='text-2xl'/></span>
                  Orders
            </button>
          </a>
          <hr className='border-white/10'/>
        </li>
        <li >
          <a href="/products">
            <button
              className=" flex justify-center items-center gap-6 ml-20 py-8"
            ><span><MdAddBusiness className='text-2xl'/></span>
                  Products
            </button>
          </a>
          <hr className='border-white/10'/>
        </li>
        <li >
          <a href="/">
            <button
              className=" flex justify-center items-center gap-6 ml-20 py-8 "
            ><span><MdLogout className='text-2xl'/></span>
                  LogOut
            </button>
          </a>
          <hr className='border-white/10' />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;
