import React, { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import { useNavigate } from "react-router-dom";

const CartProduct = ({ selectedProduct }) => {
  const { cart, dispatch } = useContext(CartContext);
  
  const navigate=useNavigate();

  
  const Increase = (id) => {
    const Index = cart.findIndex((p) => p.id === id);
    if (Index !== -1 && cart[Index].quantity < 20) {
      dispatch({ type: "Increase", id });
    }
  };

  
  const Decrease = (id) => {
    const Index = cart.findIndex((p) => p.id === id);
    if (Index !== -1 && cart[Index].quantity > 1) {
      dispatch({ type: "Decrease", id });
    }
  };

  const productPrice = selectedProduct.price * selectedProduct.quantity;

  return (
    <div className="flex w-full px-16 py-4 border border-black/25 ml-20 mt-4">
      {/* Left Section: Product Details */}
      <div className="flex items-center space-x-6 w-3/4">
        <img
          src={selectedProduct.imageUrl}
          alt=""
          className="w-32 h-40 object-cover rounded"
        />
        <div className="flex flex-col justify-between">
          <h4 className="text-xl font-semibold">{selectedProduct.title}</h4>
          <h4 className="text-md text-gray-600">All issues easy return</h4>
          <div className="flex items-center space-x-2 mt-4">
            <button
              className="rounded-full bg-gray-300 p-2 text-xl text-gray-700 hover:bg-gray-400"
              onClick={() => Decrease(selectedProduct.id)}
            >
              <b>-</b>
            </button>
            <span className="rounded bg-gray-200 py-1 px-3 text-lg text-gray-700">
              {selectedProduct.quantity}
            </span>
            <button
              className="rounded-full bg-gray-300 p-2 text-xl text-gray-700 hover:bg-gray-400"
              onClick={() => Increase(selectedProduct.id)}
            >
              <b>+</b>
            </button>
          </div>
          <button
            className="mt-4 bg-green-500 text-white py-1  rounded w-28"
            onClick={() => dispatch({ type: "Remove", id: selectedProduct.id })}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Right Section: Price Details */}
      <div className="flex flex-col justify-center items-center w-1/4 border-l pl-8">
        <h4 className="mr-24 text-lg font-semibold">Price Details</h4>
        <h4 className="  text-gray-800">Total Product Price: 
        £{productPrice.toFixed(2)}
        </h4>
        <br/>
        <p className="text-sm">Clicking on 'Continue' will not deduct any money</p>
       <button onClick={()=>navigate('/userdetails')} className="bg-green-500 px-6 py-1 rounded text-white mt-10">
        Continue
       </button>
      </div>
    </div>
  );
};

export default CartProduct;



