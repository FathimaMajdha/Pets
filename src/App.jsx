import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar.jsx";
import Support from "./pages/Support.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import DogFood from "./pages/DogFood.jsx";
import CatFood from "./pages/CatFood.jsx";
import DryDogfood from "./pages/DryDogfood.jsx";
import WetDogfood from "./pages/Wetdogfood.jsx";
import Cart from "./pages/Cart.jsx";
import Payment from "./Order/Payment.jsx";
import Order from "./Order/Order.jsx";
import Booking from "./pages/Booking.jsx";
import MyPets from "./pages/MyPets.jsx";
import ResultNotFound from "./pages/ResultNotFound.jsx";
import Wishlist from "./pages/Wishlist.jsx";

import OverView from "./Admin/OverView.jsx";
import ProductDetails from "./Admin/ProductDetails.jsx";
import Users from "./Admin/Users.jsx";
import Ordered from "./Admin/Ordered.jsx";

import { ToastContainer } from "react-toastify";
import ProductSearch from "./pages/ProductSearch.jsx";
import DryCatfood from "./pages/DryCatFood.jsx";
import WetCatFood from "./pages/WetCatFood.jsx";

const App = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = [
    "/login",
    "/register",
    "/payment",
    "/admin",
    "/dashboard",
    "/users",
    "/orders",
    "/products",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Navbar />}

      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dogfood" element={<DogFood />} />
          <Route path="/drydogfood" element={<DryDogfood />} />
          <Route path="/wetdogfood" element={<WetDogfood />} />
          <Route path="/catfood" element={<CatFood />} />
          <Route path="/drycatfood" element={<DryCatfood />} />
          <Route path="/wetcatfood" element={<WetCatFood />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductSearch />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/support" element={<Support />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/result-not-found" element={<ResultNotFound />} />

          <Route path="/dashboard" element={<OverView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Ordered />} />
          <Route path="/products" element={<ProductDetails />} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
