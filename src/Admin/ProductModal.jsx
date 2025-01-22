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
    category: "",
  });

  useEffect(() => {
    if (isOpen && product) {
      setEditProduct(product);
    }
  }, [isOpen, product]);

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save changes to this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3000/products/${editProduct.id}`, editProduct)
          .then(() => {
            toast.success("Product updated successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
            onUpdate(editProduct);
            closeModal(); 
            Swal.fire("Saved!", "The product has been updated.", "success");
          })
          .catch(() => {
            toast.error("Failed to update product. Please try again.", {
              position: "top-right",
              autoClose: 3000,
            });
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white mx-auto p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Product - {editProduct.title}
        </h2>

        <div className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="title"
              value={editProduct.title}
              onChange={handleChange}
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="imageUrl"
              value={editProduct.imageUrl}
              onChange={handleChange}
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              name="description"
              value={editProduct.description}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="category"
              value={editProduct.category}
              onChange={handleChange}
            >
              <option value="dogfoodall">Dog Food</option>
              <option value="catfoodall">Cat Food</option>
            </select>
          </div>
        </div>

        
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
