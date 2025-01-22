import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";

const ProductDetails = () => {
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
  const [editId, setEditId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });

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

  const handleSaveNewProduct = () => {
    axios
      .post("http://localhost:3000/products", newProduct)
      .then(() => {
        setProducts((prev) => {
          const updatedProducts = { ...prev };
          if (!updatedProducts[newProduct.category]) {
            updatedProducts[newProduct.category] = [];
          }
          updatedProducts[newProduct.category] = [
            newProduct,
            ...updatedProducts[newProduct.category],
          ];
          return updatedProducts;
        });
        setIsModalOpen(false);
        setNewProduct({
          id: "",
          imageUrl: "",
          title: "",
          description: "",
          price: "",
          category: "",
        });
      })
      .catch(() => {
        console.error("Error adding the product!");
      });
  };

  const handleUpdate = (product) => {
    setEditId(product.id);
    setUpdatedProduct({ ...product });
  };

  const handleSaveUpdate = () => {
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
            updatedProducts[productCategory] = updatedProducts[
              productCategory
            ].map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            );
          }

          return updatedProducts;
        });
        setEditId(null);
        setUpdatedProduct({
          id: "",
          imageUrl: "",
          title: "",
          description: "",
          price: "",
          category: "",
        });
      })
      .catch(() => {
        console.error("Error updating the product!");
      });
  };

  const handleDelete = (product) => {
    axios
      .delete(`http://localhost:3000/products/${product.id}`)
      .then(() => {
        setProducts((prev) => {
          const updatedProducts = { ...prev };
          const productCategory = Object.keys(updatedProducts).find((category) =>
            updatedProducts[category].some((p) => p.id === product.id)
          );

          if (productCategory) {
            updatedProducts[productCategory] = updatedProducts[productCategory].filter(
              (p) => p.id !== product.id
            );
          }

          return updatedProducts;
        });
      })
      .catch(() => {
        console.error("Error deleting the product!");
      });
  };

  const currentProducts = currentCategory === 'all' 
    ? [...products.dogfoodall, ...products.catfoodall] 
    : products[currentCategory];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = currentProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalProducts = currentCategory === 'all' 
    ? products.dogfoodall.length + products.catfoodall.length 
    : currentProducts.length;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <Sidebar2 />
      <div className="ml-96">
        <h1 className="text-2xl font-bold text-center my-6">Product Details</h1>

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
            {currentProductsPage.map((product) =>
              editId === product.id ? (
                <tr key={product.id}>
                  <td className="px-6 py-3 border">{product.id}</td>
                  <td>
                    <input
                      type="text"
                      className="px-6 py-3 border"
                      value={updatedProduct.imageUrl}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          imageUrl: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="px-6 py-3 border"
                      value={updatedProduct.title}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          title: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="px-6 py-3 border"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className="px-6 py-3 border"
                      value={updatedProduct.description}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </td>
                  <td>
                    <button
                      className="bg-blue-600 text-white ml-20 px-4"
                      onClick={handleSaveUpdate}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
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
                  <div className="col-span-2 mt-10 mb-10">
                  <td className="px-6 py-3 ">
                    <button
                      className="bg-green-600 text-white px-2 py-1 mr-2"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                    </td><td>
                    <button
                      className="bg-red-600 text-white px-2 py-1 mr-4"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </td>
                  </div>
                  <hr/>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="bg-gray-200 text-black px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded ml-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="ID"
                value={newProduct.id}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, id: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              ></textarea>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="dogfoodall">Dog Food</option>
                <option value="catfoodall">Cat Food</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleSaveNewProduct}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;


