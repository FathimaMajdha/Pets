import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";

const Ordered = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const userData = response.data;
        setUsers(userData);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div className="ml-96 px-20">
      <Sidebar2 />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 ml-96">User Orders</h1>
        {users.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-400 px-4 py-2">Username</th>
                <th className="border border-gray-400 px-4 py-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.orders && user.orders.length > 0 ? (
                      <div>
                        {user.orders.map((order, orderIndex) => {
                          const totalAmount = order.cartItems
                            ? order.cartItems.reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                              )
                            : 0;

                          return (
                            <div key={orderIndex} className="mb-4">
                              <p className="font-semibold text-lg">Order #{orderIndex + 1}</p>
                              <table className="table-auto border-collapse w-full mt-2">
                                <thead>
                                  <tr className="bg-gray-200">
                                    <th className="border border-gray-400 px-2 py-1">Items</th>
                                    <th className="border border-gray-400 px-2 py-1">Price</th>
                                    <th className="border border-gray-400 px-2 py-1">Total Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.cartItems ? (
                                    order.cartItems.map((item) => (
                                      <tr key={item.id}>
                                        <td className="border border-gray-400 px-2 py-1">
                                          {item.title} (x{item.quantity})
                                        </td>
                                        <td className="border border-gray-400 px-2 py-1">
                                          £{item.price.toFixed(2)}
                                        </td>
                                        <td className="border border-gray-400 px-2 py-1">
                                          £{(item.price * item.quantity).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td className="border border-gray-400 px-2 py-1" colSpan="3">
                                        No items in this order
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                              <p className="mt-2 text-right font-semibold">
                                Total Order Amount: £{totalAmount.toFixed(2)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">No orders available</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Ordered;


