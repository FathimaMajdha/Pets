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
                      <table className="table-auto border-collapse w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-2 py-1">Items</th>
                            <th className="border border-gray-400 px-2 py-1">Price</th>
                            <th className="border border-gray-400 px-2 py-1">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.orders.map((order, orderIndex) => {
                           
                            const totalAmount = order.cartItems
                              ? order.cartItems.reduce(
                                  (sum, item) => sum + item.price * item.quantity,
                                  0
                                )
                              : 0;

                            return (
                              <tr key={orderIndex}>
                                <td className="border border-gray-400 px-2 py-1">
                                  <ul>
                                    {order.cartItems ? (
                                      order.cartItems.map((item) => (
                                        <li key={item.id}>
                                          {item.title} (x{item.quantity})
                                        </li>
                                      ))
                                    ) : (
                                      <li>No items in this order</li>
                                    )}
                                  </ul>
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  <ul>
                                    {order.cartItems ? (
                                      order.cartItems.map((item) => (
                                        <li key={item.id}>£{item.price.toFixed(2)}</li>
                                      ))
                                    ) : (
                                      <li>-</li>
                                    )}
                                  </ul>
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  £{totalAmount.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

