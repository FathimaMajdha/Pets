import React, { useEffect } from "react";
import { useCart, useWishlist } from "../Features/ContextProvider";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useLayout } from "../Features/LayoutContext";
import BackHeader from "../Components/BackHeader";

const Wishlist = () => {
  const { dispatch: cartDispatch } = useCart();
  const { wishlist = [], wishlistDispatch } = useWishlist();
  const user = JSON.parse(localStorage.getItem("user"));
  const { isSidebarOpen, isSearchOpen } = useLayout();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(`/WishList/${user.id}`);
        wishlistDispatch({ type: "SET", payload: response.data?.data || [] });
      } catch (error) {
        console.error(" Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      }
    };

    if (user?.id) {
      fetchWishlist();
    }
  }, [user?.id, wishlistDispatch]);

  const handleAddToCart = async (item) => {
    try {
      const productId = item.productId || item.id;

      await axiosInstance.post(
        `/cart/add`,
        {
          userId: user.id,
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      cartDispatch({ type: "ADD", product: item });

      await handleRemove(productId);

      if (window.location.pathname === "/cart") {
        window.location.reload();
      }

      toast.success("Added to cart", { autoClose: 1500 });
    } catch (err) {
      console.error("Failed to add to cart", err);
      toast.error("Error adding to cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.delete(`/WishList/${user.id}/remove/${productId}`);
      wishlistDispatch({ type: "REMOVE", productId });
      toast.success("Removed from wishlist", { autoClose: 1500 });
    } catch (err) {
      console.error(" Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  if (!wishlist.length) {
    return (
      <div>
        {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}
        <div className="max-w-4xl mx-auto p-6 ml-1">
          <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
          <p className="text-gray-600">Your wishlist is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isSidebarOpen && <BackHeader title="Back" />}
      <div className="max-w-4xl mx-auto p-6 ">
        <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow relative bg-white">
              <img
                src={item.imageUrl || "/fallback.jpg"}
                alt={item.productName}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = "/fallback.jpg";
                }}
              />
              <h4>{item.productName}</h4>
              <p className="text-gray-600">£{item.price}.00</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-800 hover:bg-gray-800 text-white py-1 px-3 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.productId || item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
