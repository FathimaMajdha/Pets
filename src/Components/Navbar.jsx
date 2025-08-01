import React, { useState } from "react";
import { BsSearch, BsCart4 } from "react-icons/bs";
import { FaPaw, FaClipboardList, FaHeart } from "react-icons/fa";
import { LuTextSearch } from "react-icons/lu";
import { MdOutlineAccountCircle, MdContactSupport, MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useCart, useWishlist } from "../Features/ContextProvider";
import { useAuth } from "../Features/AuthContext";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLayout } from "../Features/LayoutContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const { isSidebarOpen, setIsSidebarOpen, isSearchOpen, setIsSearchOpen } = useLayout();
  const [filteredItems, setFilteredItems] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/Admin/products");
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log("Navbar cart count updated:", cartCount);
    fetchProducts();
  }, [cartCount]);

  const paths = {
    "dog food": "/dogfood",
    "cat food": "/catfood",
    offers: "/offers",
    wishlist: "/wishlist",
  };

  const items = Object.keys(paths).map((key) => key.charAt(0).toUpperCase() + key.slice(1));

  const icons = [<LuTextSearch />, <FaPaw />, <FaClipboardList />, <MdContactSupport />, <MdOutlineShoppingBag />];

  const menuItems = [
    { name: "Shop", path: "#" },
    { name: "MyPets", path: "/mypets" },
    { name: "Bookings", path: "/booking" },
    { name: "Support", path: "/support" },
    { name: "Order", path: "/order" },
  ];

  const handleSignIn = () => navigate("/login");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = async (e) => {
    const input = e.target.value.trim();
    if (!input) {
      setFilteredItems([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const res = await axiosInstance.get(`/product/search?keyword=${input}`);
      if (res.data.success) {
        setFilteredItems(res.data.data);
        setIsSearchOpen(true);
      } else {
        setFilteredItems([]);
        setIsSearchOpen(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setFilteredItems([]);
      setIsSearchOpen(false);
    }
  };

  const handleItemClick = (product) => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    } else {
      navigate("/result-not-found");
    }
    setFilteredItems([]);
    setIsSearchOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    const match = products.find((p) => p.productName.toLowerCase().includes(input));
    if (match) {
      navigate(`/product/${match.id}`);
    } else {
      navigate("/result-not-found");
    }
    setFilteredItems([]);
    e.target.reset();
    setIsSearchOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-12 bg-gray-100">
        <Link
          to="/"
          title="Click Here - Back to Home"
          className="text-gray-800 font-devonshire text-2xl sm:text-3xl md:text-4xl"
        >
          PetsFood
        </Link>

        <div className="relative flex-grow mx-4 sm:mx-6 lg:mx-12">
          <form onSubmit={handleSubmit} className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <BsSearch />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search your product"
              onChange={handleInputChange}
              className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] pl-10 pr-4 py-2 text-sm sm:text-base text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </form>

          {filteredItems.length > 0 && (
            <ul className="absolute bg-white shadow-lg rounded-lg mt-2 z-10 w-full max-w-[500px]">
              {filteredItems.map((product, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(product)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.productName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-gray-700">{user.name || "You"}</span>
              <button onClick={handleLogout} className="text-red-500 text-sm sm:text-base hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleSignIn}>
              {" "}
              Login
              <MdOutlineAccountCircle className="text-3xl sm:text-4xl text-gray-700" />
            </button>
          )}

          <Link to="/cart" className="relative mt-5">
            
            <BsCart4 className="text-3xl sm:text-4xl text-gray-700 " />
            {user?.id && cartCount > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

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
