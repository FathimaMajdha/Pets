import React, { useRef, useEffect, useState, useContext } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import axios from "axios";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";


const WetDogfood = () => {
  const { dispatch } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const sliderRef = useRef(null);
  const scrollAmount = 5000;
  const navigate = useNavigate();

  
  const scrollUp = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
    }
  };

 
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const wetDogFood = response.data[0].wetdogfood || [];
        setCart(wetDogFood);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  
  const openModal = (item) => {
    setSelectedProduct(item);
  };

  
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
     
      <div>
        <img
          className="w-[1500px] h-[400px]"
          src="https://breedingbusiness.com/wp-content/uploads/2022/09/best-dog-foods-for-poodles.jpg"
          alt="Dog Food"
        />
      </div>

     
      <div className="w-[400px] h-[500px] absolute mt-[-550px] ml-[900px] rounded-[30px]">
        <div className="ml-[-800px] mt-80">
        
          <b className="text-[46px] text-white">Wet Dog Foods</b>
        </div>
      </div>

     
      <div ref={sliderRef} className="overflow-y-auto scroll-smooth max-w-screen gap-[20px]" style={{ maxHeight: "500px" }}>
        <div className="max-w-7xl mx-auto py-8 px-4">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                 
                  <div className="w-full">
                    <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.title} />
                  </div>

                  
                  <div className="flex flex-col justify-between p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
                    <p className="text-gray-600 text-sm mb-2">{item.description.slice(0, 50)}...</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal(item)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.title}</h2>
            <img className="w-full h-72 object-cover rounded" src={selectedProduct.imageUrl} alt={selectedProduct.title} />
            <div className="text-lg font-semibold mt-2">
              Price: £{(selectedProduct.price * selectedProduct.quantity).toFixed(2)}
            </div>
            <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  dispatch({ type: "Add", selectedProduct: selectedProduct });
                  closeModal();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

     
      <div className="flex justify-end -mt-32">
        <button className="py-28 rounded-full" onClick={scrollUp}>
          <FaLongArrowAltUp className="text-xl" />
        </button>
      </div>

      
      <Footer />
    </div>
  );
};

export default WetDogfood;
