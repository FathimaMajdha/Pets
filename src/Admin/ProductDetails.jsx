import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductModal from "./ProductModal";
import Sidebar2 from "./Sidebar2";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value, categoryFilter);
  };

  const handleCategoryFilter = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    filterProducts(searchTerm, value);
  };

  const filterProducts = (search, category) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-4 bg-red-100 h-screen">
      <Sidebar2 />
      <h1 className="flex justify-center text-2xl font-bold mt-20 mb-10 ml-96 text-gray-800">
        Product Details
      </h1>

      <div className="mb-4 flex gap-4 ml-80">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded-lg w-96 ml-52"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className="border p-2 rounded-lg ml-10"
        >
          <option value="">All Products</option>
          <option value="dogfoodall">Dog Food</option>
          <option value="catfoodall">Cat Food</option>
        </select>
        <button
          onClick={handleAddProduct}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg ml-24"
        >
          Add Product
        </button>
      </div>
      <div className="flex justify-center ml-96">
        <table className="mt-4 border-collapse border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.title}</td>
                <td className="border border-gray-300 p-2">{product.category}</td>
                <td className="border border-gray-300 p-2">${product.price}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center ml-96 mt-10">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={
            currentPage ===
            Math.ceil(filteredProducts.length / productsPerPage)
          }
          className={`px-4 py-2 rounded-lg ${
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        product={editProduct}
        onUpdate={(updatedProduct) => {
          if (updatedProduct.id) {
            
            setProducts((prev) =>
              prev.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
            setFilteredProducts((prev) =>
              prev.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
          } else {
           
            setProducts((prev) => [...prev, updatedProduct]);

            
            const newFilteredProducts = [...products, updatedProduct].filter(
              (product) =>
                (!categoryFilter || product.category === categoryFilter) &&
                (!searchTerm ||
                  product.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            setFilteredProducts(newFilteredProducts);
          }
        }}
      />
    </div>
  );
};

export default ProductDetails;


