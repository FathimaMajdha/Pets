import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductModal from "./ProductModal";
import Sidebar2 from "./Sidebar2";
import AddCategoryModal from "./AddCategoryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    fetchProducts(currentPage, productsPerPage, categoryFilter);
    fetchCategories();
  }, []);

  const fetchProducts = async (page = 1, pageSize = productsPerPage, category = categoryFilter) => {
    try {
      const response = await axiosInstance.get(
        `/admin/products/paginated?page=${page}&pageSize=${pageSize}&category=${category}`
      );
      const data = response.data?.data;
      setFilteredProducts(data?.items || []);
      setTotalCount(data?.totalCount || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch paginated products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setCategories(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const searchProductsBackend = async (search, category = categoryFilter) => {
    try {
      if (search.trim() === "") {
        fetchProducts(1, productsPerPage, category);
        return;
      }

      const response = await axiosInstance.get(`/admin/search?keyword=${search}`);
      let data = Array.isArray(response.data?.data) ? response.data.data : [];

      if (category) {
        const catLower = category.toLowerCase();
        data = data.filter((product) => {
          const prodCat = product.categoryName?.toLowerCase();
          if (catLower === "dogfoodall") {
            return ["dogfoodall", "drydogfood", "wetdogfood"].includes(prodCat);
          }
          if (catLower === "catfoodall") {
            return ["catfoodall", "drycatfood", "wetcatfood"].includes(prodCat);
          }
          return prodCat === catLower;
        });
      }

      setFilteredProducts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    value.trim() ? searchProductsBackend(value, categoryFilter) : fetchProducts(1, productsPerPage, categoryFilter);
  };

  const handleCategoryFilter = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    searchTerm.trim() ? searchProductsBackend(searchTerm, value) : fetchProducts(1, productsPerPage, value);
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/admin/products/${id}`);
      fetchProducts(currentPage, productsPerPage, categoryFilter);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleAddCategory = async (categoryName) => {
    try {
      await axiosInstance.post("/category", { categoryName });
      toast.success("Category created!");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Error creating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axiosInstance.delete(`/category/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Error deleting category");
    }
  };

  const handlePageChange = (direction) => {
    const maxPage = Math.ceil(totalCount / productsPerPage);
    const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
      fetchProducts(newPage, productsPerPage, categoryFilter);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar2 />
      <div className="md:ml-80 p-4 pt-24">
        <ToastContainer position="top-right" autoClose={2000} />
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Product Management</h1>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 p-2 rounded-lg w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <select
            value={categoryFilter}
            onChange={handleCategoryFilter}
            className="border border-gray-300 p-2 rounded-lg w-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddProduct}
            className="bg-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
          >
            + Add Product
          </button>

          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
          >
            + Add Category
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="p-3 border flex items-center gap-2">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                    />
                    <span>{product.productName}</span>
                  </td>

                  <td className="p-3 border">{product.categoryName || "N/A"}</td>
                  <td className="p-3 border font-semibold text-green-600">₹{product.price}</td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-gray-800 hover:bg-gray-800 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 text-gray-600" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          <span className="font-semibold text-gray-700">
            Page {currentPage} of {Math.ceil(totalCount / productsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(totalCount / productsPerPage)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(totalCount / productsPerPage)
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>

        
        <div className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Categories</h2>
          {categories.length === 0 ? (
            <p className="text-gray-600">No categories found.</p>
          ) : (
            <ul className="divide-y">
              {categories.map((cat) => (
                <li key={cat.id} className="flex justify-between py-2 items-center">
                  <span className="text-gray-700">{cat.categoryName}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialProduct={editProduct}
          categories={categories}
          onUpdate={async (updatedProduct, imageFile) => {
            try {
              const formData = new FormData();
              formData.append("productName", updatedProduct.productName);
              formData.append("description", updatedProduct.description);
              formData.append("price", updatedProduct.price);
              formData.append("categoryName", updatedProduct.categoryName);
              if (updatedProduct.id) formData.append("id", updatedProduct.id);
              if (imageFile) formData.append("image", imageFile);

              let response;
              if (updatedProduct.id) {
                response = await axiosInstance.put(`/admin/products/${updatedProduct.id}`, formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });
                const updated = response.data.data;
                const updatedWithCategory = { ...updated, categoryName: updatedProduct.categoryName };
                setProducts((prev) => prev.map((p) => (p.id === updated.id ? updatedWithCategory : p)));
                setFilteredProducts((prev) => prev.map((p) => (p.id === updated.id ? updatedWithCategory : p)));
                toast.success("Product updated successfully");
              } else {
                response = await axiosInstance.post("/admin/products", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });
                const newProduct = response.data.data;
                setProducts((prev) => [newProduct, ...prev]);
                setFilteredProducts((prev) => [newProduct, ...prev]);
                toast.success("Product added successfully");
              }

              setIsModalOpen(false);
            } catch (err) {
              console.error("Error saving product:", err);
              toast.error("Something went wrong while saving product");
            }
          }}
        />

        <AddCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onCategoryAdded={handleAddCategory}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
