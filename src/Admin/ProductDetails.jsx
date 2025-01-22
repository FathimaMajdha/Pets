import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";
import { BsSearch } from "react-icons/bs";
import ProductModal from "../Admin/ProductModal"; 
const ProductDetails = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchVal, setSearchVal] = useState("");  
  const [products, setProducts] = useState({
    dogfoodall: [],
    catfoodall: [],
  });
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const [newProduct, setNewProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const dogFood = response.data[0]?.dogfoodall || [];
        const catFood = response.data[1]?.catfoodall || [];
        setProducts({
          dogfoodall: dogFood,
          catfoodall: catFood,
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddNewProduct = () => {
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (product) => {
    setEditProduct(product); 
    setIsModalOpen(true); 
  };

  const handleSaveUpdate = (updatedProduct) => {
    axios
      .put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct)
      .then(() => {
        setProducts((prev) => {
          const updatedProducts = { ...prev };
          const productCategory = Object.keys(updatedProducts).find((category) =>
            updatedProducts[category].some(
              (product) => product.id === updatedProduct.id
            )
          );

          if (productCategory) {
            updatedProducts[productCategory] = updatedProducts[productCategory].map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            );
          }

          return updatedProducts;
        });
        setIsModalOpen(false); 
      })
      .catch(() => {
        console.error("Error updating the product!");
      });
  };

  
  const currentProducts = currentCategory === 'all' 
    ? [...products.dogfoodall, ...products.catfoodall] 
    : products[currentCategory];

 
  const filteredProductsList = searchVal
    ? currentProducts.filter((product) =>
        product.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        product.description.toLowerCase().includes(searchVal.toLowerCase()) ||
        product.category.toLowerCase().includes(searchVal.toLowerCase())
      )
    : currentProducts;

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = filteredProductsList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProductsList.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSearchClick = () => {
    if (searchVal === "") {
      setFilteredProducts([]); 
    } else {
      setFilteredProducts(filteredProductsList); 
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Sidebar2 />
      <div className="ml-96">
        <h1 className="text-2xl font-bold text-center my-6">Product Details</h1>

        {/* Search */}
        <div className="relative flex-grow">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchVal}  
            onChange={(e) => setSearchVal(e.target.value)}  
            onKeyUp={handleSearchClick}  
            className="bg-white w-full sm:w-[400px] md:w-[200px] lg:w-[200px] px-4 py-3 text-black border border-gray-300 rounded-lg pl-10 -mb-40"
          />
          <button
            type="button"
            className="absolute left-5 top-6 transform -translate-y-1/2 text-gray-500"
            aria-label="Search"
            onClick={handleSearchClick}  
          >
            <BsSearch className="handle " />
          </button>
        </div>

        
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setCurrentCategory('dogfoodall')}
          >
            Dog Food
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setCurrentCategory('catfoodall')}
          >
            Cat Food
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setCurrentCategory('all')}
          >
            All Products
          </button>
        </div>

        
        <div className="flex justify-end -mt-12">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleAddNewProduct}
          >
            Add New Product
          </button>
        </div>

       
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 border">Image</th>
              <th className="px-6 py-3 border">Title</th>
              <th className="px-6 py-3 border">Price</th>
              <th className="px-6 py-3 border">Description</th>
              <th className="px-6 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProductsPage.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-3 border">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-3 border">{product.title}</td>
                <td className="px-6 py-3 border">{product.price}</td>
                <td className="px-6 py-3 border">{product.description}</td>
                <td className="px-6 py-3 border">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 mr-2"
                    onClick={() => handleUpdateProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.slice(currentPage - 1, currentPage + 1).map((number) => (
            <button
              key={number}
              className={`px-4 ml-10 mr-10 py-2 bg-gray-300 text-gray-800 rounded ${
                currentPage === number ? 'bg-blue-600' : ''
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Modal  */}
        {isModalOpen && (
          <ProductModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            product={editProduct}
            handleSave={handleSaveUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;




