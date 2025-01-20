import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar2 from './Sidebar2';

const ProductDetails = () => {
  const [catFood, setCatFood] = useState([]);
  const [dogFood, setDogFood] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setDogFood(response.data[0].dogfoodall);
        setCatFood(response.data[1].catfoodall);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container">     
      <Sidebar2 />
      <div className='px-72 mr-40 '>
        <h1 className="flex justify-center items-center ml-96 mt-20 text-2xl font-bold">Dog Food Products</h1>
        <table className="ml-64 w-full border-collapse border border-gray-200 mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 border border-gray-300">ID</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Image</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Product Name</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Price ($)</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            {dogFood.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-6 py-3 border border-gray-300">{product.id}</td>
                <td className="px-6 py-3 border border-gray-300">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-3 border border-gray-300">{product.title}</td>
                <td className="px-6 py-3 border border-gray-300">£{product.price.toFixed(2)}</td>
                <td className="px-6 py-3 border border-gray-300">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="flex justify-center items-center ml-96 mt-20 text-2xl font-bold">Cat Food Products</h1>
        <table className="ml-64 w-full border-collapse border border-gray-200 mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 border border-gray-300">ID</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Image</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Product Name</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Price ($)</th>
              <th scope="col" className="px-6 py-3 border border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            {catFood.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-6 py-3 border border-gray-300">{product.id}</td>
                <td className="px-6 py-3 border border-gray-300">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-3 border border-gray-300">{product.title}</td>
                <td className="px-6 py-3 border border-gray-300">£{product.price.toFixed(2)}</td>
                <td className="px-6 py-3 border border-gray-300">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
