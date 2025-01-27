import React, { useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { FaPaw, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";
import { LuTextSearch } from "react-icons/lu";
import { MdOutlineAccountCircle, MdContactSupport, MdOutlineShoppingBag } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { CartContext } from "../Features/ContextProvider";

const Navbar = () => {
  const { cart = [] } = useContext(CartContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const items = ["Dog Food", "Cat Food", "Offers"];
  const icons = [
    <LuTextSearch />,
    <FaPaw />,
    <FaClipboardList />,
    <MdContactSupport />,
    <MdOutlineShoppingBag />,
  ];

  const menuItems = [
    { name: "Shop", path: "#" },
    { name: "MyPets", path: "/mypets" },
    { name: "Bookings", path: "/booking" },
    { name: "Support", path: "/support" },
    { name: "Order", path: "/order" },
  ];

  const handleSignIn = () => navigate("/login");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setFilteredItems(
      input ? items.filter((item) => item.toLowerCase().includes(input)) : []
    );
  };

  const handleItemClick = (item) => {
    const paths = {
      "Dog Food": "/dogfood",
      "Cat Food": "/catfood",
      Offers: "/offers",
    };
    navigate(paths[item]);
    setFilteredItems([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim();
    if (input && !items.some((item) => item.toLowerCase() === input.toLowerCase())) {
      navigate("/result-not-found");
    } else if (input) {
      handleItemClick(input);
    }
    e.target.reset();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-12 bg-gray-100">
        {/* Logo */}
        <Link to="/" className="text-gray-800 font-devonshire text-2xl sm:text-3xl md:text-4xl">
          PetsFood
        </Link>

        {/* Search Bar */}
        <div className="relative flex-grow mx-4 sm:mx-6 lg:mx-12">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="    Search your product"
              onChange={handleInputChange}
              className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] px-4 py-2 text-sm sm:text-base text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label="Search"
            >
              <BsSearch />
            </button>
          </form>
          {filteredItems.length > 0 && (
            <ul className="absolute bg-white shadow-lg rounded-lg mt-2 z-10">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User and Cart */}
        <div className="flex items-center space-x-4">
          {username ? (
            <div>
              <span className="text-sm sm:text-base">{`Hello, ${username}`}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm sm:text-base hover:underline ml-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleSignIn}>
              <MdOutlineAccountCircle className="text-3xl sm:text-4xl text-gray-700" />
            </button>
          )}
          <Link to="/cart" className="relative">
            <BsCart4 className="text-3xl sm:text-4xl text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-white px-4 py-2">
        <ul className="flex flex-wrap justify-start space-x-4 sm:space-x-6 lg:space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.name === "Shop" ? (
                <button
                  onClick={toggleSidebar}
                  className="flex items-center text-gray-800 text-sm sm:text-base font-medium hover:text-gray-600"
                >
                  <span className="mr-2">{icons[index]}</span>
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-gray-800 text-sm sm:text-base font-medium hover:text-gray-600"
                >
                  <span className="mr-2">{icons[index]}</span>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isSidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
    </div>
  );
};

export default Navbar;
