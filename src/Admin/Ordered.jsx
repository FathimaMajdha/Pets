import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Sidebar2 from "./Sidebar2";

const Ordered = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      try {
        const response = await axiosInstance.get("/Admin/all");
        const usersData = Array.isArray(response.data?.data) ? response.data.data : [];
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersWithOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar2 />
      <div className="pt-28 md:pt-10 md:ml-96 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">All User Orders</h1>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-400 px-4 py-2">Username</th>
                  <th className="border border-gray-400 px-4 py-2">Email</th>
                  <th className="border border-gray-400 px-4 py-2">Orders</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white">
                    <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {user.orders && user.orders.length > 0 ? (
                        <div className="space-y-6">
                          {user.orders.map((order, index) => (
                            <div key={order.orderId || index}>
                              <p className="font-semibold text-gray-700">Order #{index + 1}</p>
                              <div className="overflow-x-auto">
                                <table className="table-auto border-collapse w-full mt-2 min-w-[300px]">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-2 py-1">Item</th>
                                      <th className="border border-gray-400 px-2 py-1">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item, i) => (
                                      <tr key={i}>
                                        <td className="border border-gray-400 px-2 py-1">{item.productName}</td>
                                        <td className="border border-gray-400 px-2 py-1">{item.quantity}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-right mt-2 font-semibold">Total: ₹{order.totalAmount.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No orders found</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Ordered;
