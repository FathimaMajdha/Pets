import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../Components/Footer";
import { useCart, useWishlist } from "../Features/ContextProvider";
import { useAuth } from "../Features/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackHeader from "../Components/BackHeader";
import { useLayout } from "../Features/LayoutContext";

const DryCatfood = () => {
  const { user } = useAuth();
  const { dispatch } = useCart();
  const { wishlist = [], wishlistDispatch, addToWishlist } = useWishlist();
  const { isSidebarOpen ,isSearchOpen } = useLayout();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view products.");
      return;
    }

    axiosInstance
      .get("/Product/all")
      .then((response) => {
        const dryCatFood = response.data.data?.filter(
          (product) => product.categoryName?.toLowerCase() === "drycatfood"
        );
        setProducts(dryCatFood || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      });
  }, [user]);

  useEffect(() => {
    let sorted = [...products];
    if (sortOption === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setProducts(sorted);
  }, [sortOption]);

  const openModal = (item) => setSelectedProduct(item);
  const closeModal = () => setSelectedProduct(null);

  const handleAddToCart = async () => {
    if (!user?.id || !selectedProduct?.id) {
      toast.error("You must be logged in to add to cart.");
      return;
    }

    try {
      await axiosInstance.post("/Cart/add", {
        userId: parseInt(user.id),
        productId: selectedProduct.id,
        quantity: selectedProduct.quantity || 1,
      });

      dispatch({ type: "ADD", product: selectedProduct });

      toast.success("Added to cart!", {
        toastId: "cart-toast",
        position: "top-right",
        autoClose: 200,
        closeOnClick: true,
      });

      closeModal();
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized. Please login again."
          : "Server error while adding to cart."
      );
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId || item.id === productId);

  const toggleWishlist = async (productId) => {
    if (!user?.id) {
      toast.error("You must be logged in to modify wishlist.");
      return;
    }

    try {
      if (isInWishlist(productId)) {
        wishlistDispatch({ type: "REMOVE", productId });
        toast.info("Removed from wishlist ", { position: "bottom-right" });
      } else {
        await addToWishlist(productId);
        toast.success("Added to wishlist ", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back to Home" />}
      <ToastContainer />
      <div>
        <img className="w-full h-[400px] object-cover" src="dogcatimg.jpg" alt="Cat Food" />
        <div className="absolute top-80 left-10">
          <b className="text-[46px] text-white drop-shadow-md">Dry Cat Foods</b>
        </div>
      </div>

      <div className="mt-8 ml-10">
        <select
          className="border shadow-xl border-gray-800/72 px-10 py-2 rounded-[20px]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-xl overflow-hidden relative border border-gray-400">
                <img className="w-48 h-48 ml-24 mt-12" src={item.imageUrl} alt={item.productName} />

                  <button
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
                    onClick={() => toggleWishlist(item.id)}
                    title={isInWishlist(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <FaHeart
                      className={`transition duration-150 text-xl ${
                        isInWishlist(item.id) ? "text-red-500" : "text-gray-300"
                      }`}
                    />
                  </button>

                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{item.productName}</h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description?.slice(0, 50) || "No description"}...
                    </p>
                    <button
                      className="bg-black text-white px-4 py-2 rounded"
                      onClick={() => openModal(item)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.productName}</h2>
            <img
              className="w-full h-72 object-cover rounded"
              src={selectedProduct.imageUrl}
              alt={selectedProduct.productName}
            />
            <div className="text-lg font-semibold mt-2">
              Price: ₹{(selectedProduct.price * (selectedProduct.quantity || 1)).toFixed(2)}
            </div>
            <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-black text-white px-4 py-2 rounded" onClick={closeModal}>
                Close
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DryCatfood;
