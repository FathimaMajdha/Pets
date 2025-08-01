import React, { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, onUpdate, initialProduct, categories = [] }) => {
  const [editProduct, setEditProduct] = useState({
    id: "",
    productName: "",
    description: "",
    price: "",
    categoryName: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
  if (initialProduct) {
    setEditProduct({
      id: initialProduct.id || "",
      productName: initialProduct.productName || "",
      description: initialProduct.description || "",
      price: initialProduct.price || "",
      categoryName: initialProduct.categoryName || "",
    });
  } else {
    
    setEditProduct({
      id: "",
      productName: "",
      description: "",
      price: "",
      categoryName: "",
    });
  }
}, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editProduct, imageFile); 
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {initialProduct ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={editProduct.productName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={editProduct.description}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="categoryName" 
              value={editProduct.categoryName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {initialProduct ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
