import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../Features/AuthContext";
import BackHeader from "../Components/BackHeader";
import { useLayout } from "../Features/LayoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSidebarOpen, isSearchOpen } = useLayout();
  const { userId, orderDetails } = location.state || {};
  const [currentOrder, setCurrentOrder] = useState(null);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const localUserId = user?.id || userId || localStorage.getItem("userid");

    if (!localUserId) {
      toast.warn("Please login first to view your orders.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const storedOrder = localStorage.getItem("latestOrder");
    const wasOrderRemoved = localStorage.getItem("orderRemoved") === "true";

    if (wasOrderRemoved) {
      setCurrentOrder(null);
    } else if (orderDetails) {
      setCurrentOrder(orderDetails);
      localStorage.setItem("latestOrder", JSON.stringify(orderDetails));
    } else if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);

        const formattedOrder = parsedOrder?.orderItems
          ? {
              cartItems: parsedOrder.orderItems.map((item) => ({
                title: item.productName,
                description: item.description || "",
                quantity: item.quantity,
                price: item.price || 0,
              })),
              totalAmount: parsedOrder.totalAmount || 0,
              paymentStatus: parsedOrder.paymentStatus,
              deliveryStatus: parsedOrder.deliveryStatus,
            }
          : parsedOrder;

        setCurrentOrder(formattedOrder);
        if (!formattedOrder.deliveryStatus) {
          fetchOrders();
          return;
        }
      } catch (err) {
        console.error("Failed to parse latest order from localStorage:", err);
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`/Order/${localUserId}`);
        let orders = res.data.data || [];

        const removedOrderIds = JSON.parse(localStorage.getItem("removedOrderIds") || "[]");

        orders = orders.filter((order) => !removedOrderIds.includes(order.orderId));

        if (orders.length > 0) {
          const latestOrder = orders[orders.length - 1];

          const formattedCurrentOrder = {
            orderId: latestOrder.orderId,
            cartItems: latestOrder.items.map((item) => ({
              title: item.productName,
              description: item.description,
              quantity: item.quantity,
              imageUrl: item.imageUrl,
            })),
            totalAmount: latestOrder.totalAmount,
            paymentStatus: latestOrder.paymentStatus,
            deliveryStatus: latestOrder.deliveryStatus,
          };

          localStorage.setItem("latestOrder", JSON.stringify(formattedCurrentOrder));
          setCurrentOrder(formattedCurrentOrder);

          const restOrders = orders.slice(0, orders.length - 1);

          const formattedPreviousOrders = restOrders.map((order) => ({
            orderId: order.orderId,
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            deliveryStatus: order.deliveryStatus,
            items: order.items.map((item) => ({
              productName: item.productName,
              description: item.description,
              quantity: item.quantity,
              imageUrl: item.imageUrl,
            })),
          }));

          setPreviousOrders(formattedPreviousOrders);
        } else {
          setCurrentOrder(null);
          setPreviousOrders([]);
        }
      } catch (error) {
        console.error("Error fetching previous orders:", error?.response?.data || error);
      }
    };

    fetchOrders();
  }, [user, userId, orderDetails, navigate]);

  const handleRemoveCurrentOrder = async () => {
    if (!currentOrder?.orderId) {
      toast.warn("No current order to remove.");
      return;
    }

    try {
      await axiosInstance.delete(`/Order/${currentOrder.orderId}`);

      localStorage.removeItem("latestOrder");
      setCurrentOrder(null);
      localStorage.setItem("orderRemoved", "true");

      toast.success("order removed successfully.");
    } catch (error) {
      console.error("Failed to delete current order:", error?.response?.data || error);
      toast.error("Failed to remove current order. Please try again.");
    }
  };

  const handleRemovePreviousOrder = async (orderIdToRemove) => {
    try {
      await axiosInstance.delete(`/Order/${orderIdToRemove}`);

      const updatedOrders = previousOrders.filter((order) => order.orderId !== orderIdToRemove);
      setPreviousOrders(updatedOrders);

      toast.success("order removed successfully.");
    } catch (error) {
      console.error("Failed to delete order:", error?.response?.data || error);
      toast.error("Failed to remove order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

        <h3 className="text-lg font-semibold">Current Order:</h3>
        {currentOrder?.cartItems?.length > 0 ? (
          <div className="mt-4 border p-4 rounded bg-gray-50 border-gray-400">
            <ul className="space-y-4">
              {currentOrder.cartItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="flex justify-between items-center pb-4 border-b border-gray-300 last:border-none">
                    <div>
                      <h4 className="font-medium ml-32">{item.title}</h4>
                      <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                      <p className="text-sm text-gray-600 ml-32">{item.description}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ul>

            <div className="mt-4 text-right font-bold text-lg">
              Total Amount: ₹{(currentOrder.totalAmount || 0).toFixed(2)}
            </div>

            {currentOrder.paymentStatus && (
              <div className="text-sm mt-2 text-green-700">
                Payment Status: <span className="font-medium capitalize">{currentOrder.paymentStatus}</span>
              </div>
            )}

            <div className="text-sm text-green-700">
              Delivery Status: <span className="font-medium capitalize">{currentOrder.deliveryStatus || "Processing"}</span>
            </div>

            <button
              onClick={handleRemoveCurrentOrder}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded "
            >
              Remove Current Order
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No current order found.</p>
        )}

        <hr className="my-8" />
        <h3 className="text-lg font-semibold">Your Orders:</h3>
        {previousOrders.length > 0 ? (
          previousOrders.map((order, idx) => (
            <div key={order.orderId || idx} className="mt-4 border p-4 rounded  border-gray-400 ">
              <h4 className="font-semibold text-gray-700 mb-2">Order #{idx + 1}</h4>

              <ul className="text-sm mb-2 space-y-3">
                {order.items?.map((item, i) => (
                  <React.Fragment key={i}>
                    <li className="flex items-center space-x-4 pb-4 border-b border-gray-300 last:border-none">
                      <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </ul>

              <div className="text-right font-semibold mb-2">Total: ₹{order.totalAmount?.toFixed(2)}</div>

              <div className="text-sm text-green-600">
                Payment Status: <span className="font-medium capitalize">{order.paymentStatus}</span>
              </div>
              <div className="text-sm text-green-600">
                Delivery Status: <span className="font-medium capitalize">{order.deliveryStatus || "Processing"}</span>
              </div>

              <button
                onClick={() => handleRemovePreviousOrder(order.orderId)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Remove Order Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No previous orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
