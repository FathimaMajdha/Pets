import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductModal from "./ProductModal";
import Sidebar2 from "./Sidebar2";
import AddCategoryModal from "./AddCategoryModal";

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
    searchTerm.trim()
      ? searchProductsBackend(searchTerm, value)
      : fetchProducts(1, productsPerPage, value);
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
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddCategory = async (categoryName) => {
    try {
      await axiosInstance.post("/category", { categoryName });
      alert("Category created!");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Error creating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axiosInstance.delete(`/category/${id}`);
      alert("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Error deleting category");
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
    <div className="bg-red-100 min-h-screen">
      <Sidebar2 />
      <div className="md:ml-96 p-4">
        <h1 className="text-xl md:text-2xl font-bold text-center mt-20 md:mt-10 mb-6 text-gray-800">
          Product Details
        </h1>

        <div className="mb-6 flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-lg w-72 md:w-96"
          />

          <select
            value={categoryFilter}
            onChange={handleCategoryFilter}
            className="border p-2 rounded-lg w-64"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <button onClick={handleAddProduct} className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Add Product
          </button>

          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Add Category
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-800 text-white text-sm md:text-base">
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="text-sm md:text-base">
                  <td className="border border-gray-300 p-2">{product.productName}</td>
                  <td className="border border-gray-300 p-2">{product.categoryName || "N/A"}</td>
                  <td className="border border-gray-300 p-2">₹{product.price}</td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-gray-800 text-white"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(totalCount / productsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(totalCount / productsPerPage)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(totalCount / productsPerPage)
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-800 text-white"
            }`}
          >
            Next
          </button>
        </div>

        
        <div className="mt-10 w-full md:w-3/4 mx-auto bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Categories</h2>
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id} className="flex justify-between items-center border-b pb-2">
                  <span>{cat.categoryName}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

              if (updatedProduct.id) {
                formData.append("id", updatedProduct.id);
              }

              if (imageFile) {
                formData.append("image", imageFile);
              }

              let response;

              if (updatedProduct.id) {
                response = await axiosInstance.put(`/admin/products/${updatedProduct.id}`, formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });

                const updated = response.data.data;

                const updatedWithCategoryName = {
                  ...updated,
                  categoryName: updatedProduct.categoryName,
                };

                setProducts((prev) => prev.map((p) => (p.id === updated.id ? updatedWithCategoryName : p)));
                setFilteredProducts((prev) => prev.map((p) => (p.id === updated.id ? updatedWithCategoryName : p)));
              } else {
                response = await axiosInstance.post("/admin/products", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });

                const newProduct = response.data.data;

                setProducts((prev) => [newProduct, ...prev]);
                setFilteredProducts((prev) => [newProduct, ...prev]);
              }

              setIsModalOpen(false);
            } catch (err) {
              console.error("Error saving product:", err);
              alert("Something went wrong!");
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
