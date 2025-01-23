import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";

const ProductModal = ({ isOpen, closeModal, product, onUpdate }) => {
  const [editProduct, setEditProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    description: "",
    price: "",
    category: "dogfoodall",
  });

  useEffect(() => {
    if (isOpen && product) {
      setEditProduct(product);
    } else if (isOpen && !product) {
      setEditProduct({
        id: "",
        imageUrl: "",
        title: "",
        description: "",
        price: "",
        category: "dogfoodall",
      });
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editProduct.title || !editProduct.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    Swal.fire({
      title: "Save changes?",
      text: "You are about to save this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const saveProduct = async () => {
          try {
            let response;
            if (editProduct.id) {
              response = await axios.patch(
                `http://localhost:3000/products/${editProduct.id}`,
                editProduct
              );
            } else {
              response = await axios.post(
                `http://localhost:3000/products`, 
                {
                  ...editProduct,
                  category: editProduct.category || "dogfoodall"
                }
              );
            }
            if (onUpdate) {
              onUpdate(response.data);
            }

            toast.success("Product saved successfully!");

            if (closeModal) {
              closeModal();
            }
          } catch (error) {
            console.error("Save product error:", error);
            toast.error("Failed to save the product. Please try again.");
          }
        };
        saveProduct();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white mx-auto p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editProduct.id ? `Edit Product` : `Add Product`}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title*</label>
            <input
              type="text"
              name="title"
              value={editProduct.title}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={editProduct.imageUrl}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price*</label>
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={editProduct.category}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option value="dogfoodall">Dog Food</option>
              <option value="catfoodall">Cat Food</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button 
            type="button"
            onClick={closeModal} 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSave} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;