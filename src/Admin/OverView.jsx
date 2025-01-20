import React, { useEffect, useState } from 'react';
import Sidebar2 from './Sidebar2';

const OverView = () => {
  const [data, setData] = useState({ users: [], orders: [] });
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); 
        const usersData = await response.json();
        const activeUsers = usersData.filter(user => !user.isBlocked).length;
        let orders = [];
        let revenue = 0;

        usersData.forEach(user => {
          if (user.orders && user.orders.length > 0) {
            orders = [...orders, ...user.orders];
            revenue += user.orders.reduce((sum, order) => sum + order.totalAmount, 0);
          }
        });

        setData({ users: usersData, orders });
        setTotalUsers(activeUsers);
        setTotalOrders(orders.length);
        setTotalRevenue(revenue.toFixed(2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar2 />
      <div className="p-20 ml-80">
        <h1 className="text-gray-800 text-2xl ml-96 font-bold">Admin Dashboard</h1>
        <div className="flex mt-10">
          <div className="bg-teal-500 text-white font-bold text-2xl h-32 w-80 rounded-[10px] flex justify-center items-center">
            <p> Total Users<br/><span className='ml-14'>{totalUsers-1}</span></p>
          </div>

          <div className="bg-blue-500 text-white font-bold text-2xl h-32 w-80 rounded-[10px] ml-5 flex justify-center items-center">
          <p>Total Orders<br/><span className='ml-14'>{totalOrders}</span></p>
          </div>
          <div className="bg-green-500 text-white font-bold text-2xl h-32 w-80 rounded-[10px] ml-5 flex justify-center items-center">
            <p>Total Revenue<br/><span className='ml-10'>£{totalRevenue}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
