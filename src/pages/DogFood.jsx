import React, {  useState, useEffect } from "react";
import {  FaHeart } from "react-icons/fa";
import Footer from "../Components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { useCart, useWishlist } from "../Features/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Features/AuthContext";
import BackHeader from "../Components/BackHeader";
import { useLayout } from "../Features/LayoutContext";

const DogFood = () => {
  const { user } = useAuth();
  const { dispatch } = useCart();
  const { wishlist = [], wishlistDispatch, addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const { isSidebarOpen, isSearchOpen } = useLayout();

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view products.");
      return;
    }

    axiosInstance
      .get("/Product/all")
      .then((response) => {
        const dogFoodProducts = response.data.data?.filter((product) => {
          const cat = product.categoryName?.toLowerCase();
          return cat === "dogfoodall" || cat === "drydogfood" || cat === "wetdogfood";
        });

        setProducts(dogFoodProducts);
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

      toast.dismiss("cart-toast");
      toast.success("Added to cart!", {
        toastId: "cart-toast",
        position: "top-right",
        autoClose: 200,
        closeOnClick: false,
      });

      closeModal();
    } catch (error) {
      console.error("product added to cart failed:", error);
      toast.error(
        error.response?.status === 401 ? "Unauthorized. Please login again." : "Server error while adding to cart."
      );
    }
  };

  const isInWishlist = (productId) =>
  wishlist.some((item) => (item.productId || item.id) === productId);

 const toggleWishlist = async (productId) => {
  if (!user?.id) {
    toast.error("You must be logged in to modify wishlist.");
    return;
  }

  try {
    if (isInWishlist(productId)) {
      await axiosInstance.delete(`/WishList/${user.id}/remove/${productId}`);
      wishlistDispatch({ type: "REMOVE", productId });
      toast.info("Removed from wishlist", { position: "top-right" });
    } else {
      
      await addToWishlist(productId);
      console.log("Trying to add to wishlist:", productId);

      toast.success("Product added to wishlist", { position: "top-right" });
    }
  } catch (error) {
    console.error("Wishlist toggle failed:", error);
    toast.error("Something went wrong.");
  }
};

  return (
    <div>
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back to Home" />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      <div>
        <img className="w-full h-[400px] object-cover" src="dogcatimg.jpg" alt="Dog Food Banner" />
        <div className="absolute top-80 left-10">
          <b className="text-[46px] text-white drop-shadow-md">Dog Foods</b>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 ml-10">
        <a href="/drydogfood" className="border shadow-md px-6 py-2 rounded-[20px]">
          Dry Dog Food
        </a>
        <a href="/wetdogfood" className="border shadow-md px-6 py-2 rounded-[20px]">
          Wet Dog Food
        </a>
        <button className="border shadow-md px-6 py-2 rounded-[20px]">Puppy Food</button>
        <button className="border shadow-md px-6 py-2 rounded-[20px]">Royal Canin</button>
        <button className="border shadow-md px-6 py-2 rounded-[20px]">James Wellbeloved</button>
      </div>

      <div className="mt-6 ml-10">
        <select
          className="border shadow-md px-6 py-2 rounded-[20px]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                <img className="w-80 h-48 object-cover ml-14" src={item.imageUrl} alt={item.productName} />
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
                  <p className="text-gray-600 text-sm mb-2">{item.description?.slice(0, 50) || "No description"}...</p>
                  <button className="bg-black text-white px-4 py-2 rounded" onClick={() => openModal(item)}>
                    View
                  </button>
                </div>
              </div>
            ))
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

export default DogFood;
