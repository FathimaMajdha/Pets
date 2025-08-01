import React, { useEffect, useState } from "react";
import Sidebar2 from "./Sidebar2";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import axiosInstance from "../utils/axiosInstance";

const OverView = () => {
  const [cards, setCards] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [dailyOrders, setDailyOrders] = useState([]);
  const [revenueByUser, setRevenueByUser] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [ordersPerUser, setOrdersPerUser] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/admin/overview");
        const {
          totalUsers,
          totalOrders,
          totalRevenue,
          ordersOverTime,
          revenueByUser,
          topProducts,
          ordersPerUser,
          dailyRevenueTrend,
        } = res.data.data;

        setCards({
          totalUsers,
          totalOrders,
          totalRevenue: totalRevenue?.toFixed(2) || "0.00",
        });

        setDailyOrders(ordersOverTime);
        setRevenueByUser(revenueByUser);
        setTopProducts(topProducts);
        setOrdersPerUser(ordersPerUser);
        setDailyRevenue(dailyRevenueTrend);
      } catch (err) {
        console.error("Error loading overview:", err);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

  const cardStyle =
    "flex flex-col items-center justify-center bg-white shadow-md rounded-full h-44 w-44 sm:h-52 sm:w-52 p-4 sm:p-6 border-4 border-dashed border-gray-300 transition-transform hover:scale-105 duration-300";

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 fixed md:static top-0 left-0 z-10">
        <Sidebar2 />
      </div>

      <div className="md:ml-64 w-full px-4 sm:px-6 md:px-10 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">📊 Admin Dashboard</h1>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className={cardStyle}>
            <div className="text-gray-600">Total Users</div>
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">{cards.totalUsers}</div>
          </div>
          <div className={cardStyle}>
            <div className="text-gray-600">Total Orders</div>
            <div className="text-3xl sm:text-4xl font-bold text-green-600">{cards.totalOrders}</div>
          </div>
          <div className={cardStyle}>
            <div className="text-gray-600">Total Revenue</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">₹{cards.totalRevenue}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Orders Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue by User</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={revenueByUser} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {revenueByUser.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Top 5 Selling Products</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Orders Per User</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersPerUser}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-4 sm:p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Daily Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dailyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
