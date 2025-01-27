import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, orderDetails } = location.state || {}; 

  const [orders, setOrders] = useState([]); 
  const [order, setOrder] = useState(orderDetails); 

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const user = response.data.find((user) => user.id === userId); 
        if (user) {
          setOrders(user.orders || []); 
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const updateOrdersInDB = async (updatedOrders) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find((user) => user.id === userId);

      if (user) {
        
        user.orders = updatedOrders;
        await axios.put(`http://localhost:3000/users/${userId}`, user);
        console.log("Orders updated successfully!");
        setOrders(updatedOrders); 
      }
    } catch (error) {
      console.error("Error updating orders in the database:", error);
    }
  };

  const removeOrder = async () => {
    const updatedOrders = orders.filter((userOrder) => userOrder.orderId !== order.orderId);
    await updateOrdersInDB(updatedOrders);
    setOrder(null); 
    navigate("/"); 
  };

  const updateQuantity = (index, change) => {
    const updatedCartItems = [...order.cartItems];
    updatedCartItems[index].quantity += change;
    if (updatedCartItems[index].quantity <= 0) {
      updatedCartItems[index].quantity = 1;
    }
    const updatedTotalAmount = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setOrder({ ...order, cartItems: updatedCartItems, totalAmount: updatedTotalAmount });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-red-100 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

      <h3 className="text-lg font-semibold">Current Order:</h3>
      {order ? (
        <div>
          <ul className="space-y-4 mt-4">
            {order.cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <h4 className="text-md font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity:{" "}
                    <button
                      className="bg-gray-200 px-2 mx-1"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="bg-gray-200 px-2 mx-1"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-700">Price: £{item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-lg font-semibold">Total Amount:</h4>
            <p className="text-xl font-bold">£{order.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p>No valid order details found.</p>
      )}

      <div className="mt-4">
        <button
          onClick={removeOrder}
          className="w-full bg-red-500 text-white py-2 px-4 rounded"
        >
          Remove Order
        </button>
      </div>

      <hr className="my-6" />
      <h3 className="text-lg font-semibold">Your Previous Orders:</h3>
      {orders.length > 0 ? (
        <div>
          {orders.map((previousOrder, index) => (
            <div key={index} className="border-b py-4">
              <h4 className="font-semibold">Order {index + 1}:</h4>
              <p className="text-sm text-gray-500">Order ID: {previousOrder.orderId}</p>
              <div className="mt-4">
                <ul className="space-y-2">
                  {previousOrder.cartItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-500">Price: £{item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Total: £{previousOrder.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No previous orders found.</p>
      )}
    </div>
  );
};

export default Order;

