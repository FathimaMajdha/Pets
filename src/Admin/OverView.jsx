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
import { FaUsers, FaShoppingCart, FaRupeeSign, FaClock } from "react-icons/fa";

const OverView = () => {
  const [cards, setCards] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: "0.00" });
  const [dailyOrders, setDailyOrders] = useState([]);
  const [revenueByUser, setRevenueByUser] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [ordersPerUser, setOrdersPerUser] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

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
          recentActivities,
        } = res.data.data;

        setCards({
          totalUsers,
          totalOrders,
          totalRevenue: totalRevenue?.toFixed(2) || "0.00",
        });

        setDailyOrders(ordersOverTime || []);
        setRevenueByUser(revenueByUser || []);
        setTopProducts(topProducts || []);
        setOrdersPerUser(ordersPerUser || []);
        setDailyRevenue(dailyRevenueTrend || []);
        setRecentActivities(recentActivities || []);
      } catch (err) {
        console.error("Error loading overview:", err);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

  const cardList = [
    {
      title: "Total Users",
      value: cards.totalUsers,
      icon: <FaUsers className="text-blue-500 text-3xl" />,
    },
    {
      title: "Total Orders",
      value: cards.totalOrders,
      icon: <FaShoppingCart className="text-green-500 text-3xl" />,
    },
    {
      title: "Total Revenue",
      value: `₹${cards.totalRevenue}`,
      icon: <FaRupeeSign className="text-purple-500 text-3xl" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-tr from-gray-50 via-white to-gray-100">
      <div className="w-full md:w-64 fixed md:static top-0 left-0 z-10">
        <Sidebar2 />
      </div>

      <div className="md:ml-64 w-full px-4 sm:px-6 md:px-10 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Admin Dashboard</h1>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {cardList.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-6 transition hover:scale-[1.03] duration-300"
            >
              <div className="mb-3">{card.icon}</div>
              <div className="text-gray-500 text-sm">{card.title}</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">{card.value}</div>
            </div>
          ))}
        </div>


        <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <FaClock className="text-indigo-500" />
            Recent Activities
          </h2>
          <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
            {recentActivities.length === 0 ? (
              <div className="text-sm text-gray-500 italic">No recent activities.</div>
            ) : (
              recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="border-l-4 border-indigo-500 pl-4 py-2 hover:bg-gray-50 rounded transition"
                >
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <ChartCard title="Orders Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue by User">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByUser}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {revenueByUser.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${parseFloat(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top 5 Selling Products">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Orders Per User">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersPerUser}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="md:col-span-2">
            <ChartCard title="Daily Revenue Trend">
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
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

       
        
      </div>
    </div>
  );
};


const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </div>
);

export default OverView;
