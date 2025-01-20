import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-gray-600">Loading user details...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p className="text-gray-600">No user data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-screen p-10">
      <h1 className="text-gray-800 text-2xl font-bold mb-6">User Details</h1>

      <div className="bg-gray-800 text-white shadow p-6 rounded mb-6">
        <p className="text-2xl">
          <strong>Username : {user.username}</strong> 
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Password:</strong> {user.password}
        </p>
        <p>
          <strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}
        </p>
        <p>
          <strong>Total Orders:</strong> {user.orders.length}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      {user.orders.length > 0 ? (
        user.orders.map((order) => (
          <div key={order.orderId} className="bg-gray-800 text-white border border-gray-800 shadow p-6 rounded mb-4">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Cardholder Name:</strong> {order.paymentInfo.cardholderName}
            </p>
            <p>
              <strong>Payment Info:</strong> **** **** ****{" "}
              {order.paymentInfo.cardNumber.slice(-4)}
            </p>

            <h3 className="text-lg font-semibold mt-4">Cart Items:</h3>
            {order.cartItems.map((item, idx) => (
              <div key={idx} className="mt-2 border-t pt-2 bg-white text-gray-800 ">
                <div>
                 <img
                    src={item.imageUrl}
                    
                    className="w-24 h-24 "
                  />
                </div>
                <div className="ml-40 -mt-20">
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No orders available.</p>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Users List
      </button>
    </div>
  );
};

export default ViewDetails;
