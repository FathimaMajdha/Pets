import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useCart } from "../Features/ContextProvider";
import { useAuth } from "../Features/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductSearch = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/Admin/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching product details");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user?.id || !product?.id) {
      toast.error("You must be logged in to add to cart.");
      return;
    }

    try {
      await axiosInstance.post("/Cart/add", {
        userId: parseInt(user.id),
        productId: product.id,
        quantity: 1,
      });

      dispatch({ type: "ADD", product });

      toast.dismiss("cart-toast");
      toast.success("Added to cart!", {
        toastId: "cart-toast",
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
      });
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized. Please login again."
          : "Server error while adding to cart."
      );
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full md:w-64 object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-2">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.categoryName}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
