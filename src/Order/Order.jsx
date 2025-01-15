import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { orderDetails } = location.state || {}; 
  
  
  const [order, setOrder] = useState(orderDetails);

  
  if (!order) {
    return <p>No order details found. Please make sure the order was processed correctly.</p>;
  }

  const { orderId, cartItems, totalAmount } = order; 
  
  const removeOrder = async () => {
    const userId = "9dbf";  

    try {
      
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find((user) => user.id === userId);

      if (user) {
       
        user.orders = user.orders.filter(order => order.orderId !== orderId);

        await axios.put(`http://localhost:3000/users/${userId}`, user);
        console.log("Order removed successfully!");

        
        setOrder(null);

       
        navigate('/'); 
      }
    } catch (error) {
      console.error("Error removing the order:", error);
    }
  };

 
  const updateQuantity = (index, change) => {
    const updatedCartItems = [...cartItems];
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

    
      {!order ? (
        <p>No order available. The order has been removed.</p>
      ) : (
        <div>
         
          <h3 className="text-lg font-semibold">Order ID: {orderId}</h3>
          <ul className="space-y-4 mt-4">
            <h4 className="text-md font-semibold">Products:</h4>
            {cartItems?.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <h4 className="text-md font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center">
               
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                
                  <span className="px-4">{item.quantity}</span>
                
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <div>
                  <p className="text-lg text-gray-700">Price: £{item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Total Amount:</h4>
            <p className="text-xl font-bold">£{totalAmount.toFixed(2)}</p>
          </div>

         
          <div className="mt-4">
            <button
              onClick={removeOrder}
              className="w-full bg-red-500 text-white py-2 px-4 rounded"
            >
              Remove Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
