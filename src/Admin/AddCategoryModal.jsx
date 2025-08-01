import React, { useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    try {
      await onCategoryAdded(categoryName);
      setCategoryName("");
      onClose();
    } catch (error) {
      console.error(" Failed to add category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
