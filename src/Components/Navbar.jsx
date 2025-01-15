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

  const handleSignIn = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    if (input) {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(input)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleItemClick = (item) => {
    if (item === "Dog Food") {
      navigate("/dogfood");
    } else if (item === "Cat Food") {
      navigate("/catfood");
    } else if (item === "Offers") {
      navigate("/offers");
    }
    setFilteredItems([]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim();
    if (input) {
      handleItemClick(input);
    }
    e.target.reset(); 
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  const username = localStorage.getItem("username");

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
              placeholder="Search your product"
              onChange={handleInputChange}
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
          {filteredItems.length > 0 && (
            <ul className="ml-10">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginRight: "100px" }}>
          {username ? (
            <div>
              <span className="mr-4">{`Hello, ${username}`}</span>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </div>
          ) : (
            <button onClick={handleSignIn}>
              <MdOutlineAccountCircle className="text-4xl" />
            </button>
          )}
        </div>

        <div>
          <Link to="/cart" className="ml-6">
            {cart.length}
            <BsCart4 className="text-4xl mr-44" />
          </Link>
        </div>
      </div>

      <div className="bg-white px-4 py-2 mt-4">
        <ul className="flex flex-wrap justify-start space-x-5 sm:space-x-3 lg:space-x-5">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center mb-2 sm:mb-4">
              {item.name === "Shop" ? (
                <button
                  onClick={toggleSidebar}
                  className="flex items-center text-black text-xs sm:text-sm lg:text-base font-medium px-2 py-1 hover:text-gray-700"
                >
                  <span className="mr-2">{icons[index]}</span>
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-black text-xs sm:text-sm lg:text-base font-medium px-2 py-1 hover:text-gray-700"
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
