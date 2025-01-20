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

  const handleRemove = (productId, userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            orders: user.orders.filter((order) => order.id !== productId),
          }
        : user
    );

    const updatedUser = updatedUsers.find((user) => user.id === userId);

    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedUser.orders,
      })
      .then(() => {
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating the orders:", error);
      });
  };

  const handleStatus = (productId, userId, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            orders: user.orders.map((order) =>
              order.id === productId ? { ...order, status: newStatus } : order
            ),
          }
        : user
    );

    const updatedUser = updatedUsers.find((user) => user.id === userId);

    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedUser.orders,
      })
      .then(() => {
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating the status:", error);
      });
  };

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
                            <th className="border border-gray-400 px-2 py-1">Status</th>
                            <th className="border border-gray-400 px-2 py-1">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.orders.map((order) => {
                            const totalAmount = order.cartItems.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            );
                            return (
                              <tr key={order.id}>
                                <td className="border border-gray-400 px-2 py-1">
                                  <ul>
                                    {order.cartItems.map((item) => (
                                      <li key={item.id}>
                                        {item.title} (x{item.quantity})
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  <ul>
                                    {order.cartItems.map((item) => (
                                      <li key={item.id}>£{item.price.toFixed(2)}</li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  £{totalAmount.toFixed(2)}
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  <span className="font-bold">{order.status || "Pending"}</span>
                                </td>
                                <td className="border border-gray-400 px-2 py-1">
                                  <select
                                    className="bg-white border border-gray-400 px-2 py-1"
                                    value={order.status || "Pending"}
                                    onChange={(e) =>
                                      handleStatus(order.id, user.id, e.target.value)
                                    }
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Order Confirmed">Order Confirmed</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                  <button
                                    onClick={() => handleRemove(order.id, user.id)}
                                    className="text-red-500 text-sm hover:underline ml-2"
                                  >
                                    Cancel
                                  </button>
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
