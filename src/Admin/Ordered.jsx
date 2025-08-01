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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Sidebar2 />
      <div className="pt-28 md:pt-10 md:ml-96 px-4 sm:px-6 md:px-10">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center md:text-left border-b-2 border-gray-300 pb-2">
          All User Orders
        </h1>

        {users.length > 0 ? (
          <div className="space-y-6 ">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-800 transition duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    {user.orders?.length || 0} Order{user.orders?.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {user.orders && user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order, index) => (
                      <div
                        key={order.orderId || index}
                        className="bg-gray-50 border border-gray-200 rounded-md p-4"
                      >
                        <p className="font-semibold text-gray-600 mb-2">
                          Order #{index + 1}
                        </p>
                        <div className="overflow-x-auto">
                          <table className="table-auto w-full text-sm">
                            <thead className="bg-gray-200 text-gray-800">
                              <tr>
                                <th className="px-4 py-2 text-left">Item</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                  <td className="px-4 py-2">{item.productName}</td>
                                  <td className="px-4 py-2">{item.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right mt-2 text-sm font-semibold text-gray-700">
                          Total: ₹{order.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No orders found</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Ordered;
