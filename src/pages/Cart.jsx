import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackHeader from "../Components/BackHeader";
import { useAuth } from "../Features/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { useCart } from "../Features/ContextProvider";
import { useLayout } from "../Features/LayoutContext";

const Cart = () => {
  const { dispatch } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const { isSidebarOpen, isSearchOpen } = useLayout();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;

      try {
        const res = await axiosInstance.get(`/cart/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cartData = res.data.data.cartItems;

        console.log("Cart Items:", cartData);

        if (!Array.isArray(cartData)) {
          console.error("Unexpected cart format:", res.data);
          return;
        }

        setCart(cartData);

        const qty = {};
        const sel = {};
        cartData.forEach((item) => {
          const id = item.productId || item.id;
          qty[id] = item.quantity || 1;
          sel[id] = false;
        });

        setQuantities(qty);
        setSelectedItems(sel);
      } catch (error) {
        console.error("Failed to fetch cart", error);
        toast.error("Error fetching cart items");
      }
    };

    fetchCart();
  }, [user, token]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    }
  };

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`/cart/${user.id}/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) => prev.filter((item) => (item.productId || item.id) !== id));

      dispatch({ type: "REMOVE", productId: id });

      toast.info("Product removed from cart", { autoClose: 200 });
    } catch (error) {
      toast.error("Failed to remove product");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = (checked) => {
    const updated = {};
    cart.forEach((item) => {
      const id = item.productId || item.id;
      updated[id] = checked;
    });
    setSelectedItems(updated);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const id = item.productId || item.id;
      const quantity = quantities[id] || 1;
      const price = item.product?.price || 0;
      return selectedItems[id] ? total + price * quantity : total;
    }, 0);
  };

  const handleContinue = () => {
    const selectedOrderItems = cart
      .filter((item) => selectedItems[item.productId || item.id])
      .map((item) => {
        const id = item.productId || item.id;
        return {
          ...item,
          quantity: quantities[id] || 1,
        };
      });

    if (selectedOrderItems.length === 0) {
      toast.warning("Please select at least one item to continue.");
      return;
    }

    navigate("/payment", {
      state: { orderDetails: { items: selectedOrderItems } },
    });
  };

  return (
    <div className="container mx-auto p-6">
       {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}
      <h2 className="text-2xl font-bold mb-6 mt-6">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={Object.values(selectedItems).every(Boolean)}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <label className="text-sm">Select All</label>
          </div>

          <table className="w-full table-auto border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Select</th>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Product Name</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const id = item.productId || item.id;
                const product = item.product || {};

                return (
                  <tr key={id} className="border-b">
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems[id] || false}
                        onChange={() => handleCheckboxChange(id)}
                      />
                    </td>
                    <td className="p-2">
                      <img src={product.imageUrl} alt={product.productName} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="p-2 font-medium">{product.productName}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={quantities[id] || 1}
                        min="1"
                        onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleRemove(id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1"
                      >
                        <FaTrash className="text-lg" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="text-right text-xl font-semibold">Total: ₹{calculateTotal().toFixed(2)}</div>

          <div className="mt-6 text-right">
            <button
              onClick={handleContinue}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
