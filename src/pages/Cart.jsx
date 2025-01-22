import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Features/ContextProvider';
import CartProduct from '../Components/CartProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext); 
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const userId = "9dbf"; 

  const saveCartToDatabase = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: cart,
      });
      if (response.status === 200) {
        console.log("Cart updated successfully in the database.");
      } else {
        console.error("Failed to update the cart.");
      }
    } catch (error) {
      console.error("Error while updating the cart:", error);
    }
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId); 
      } else {
        return [...prevSelected, productId]; 
      }
    });
  };

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to proceed.");
      return;
    }
    const selectedCartItems = cart.filter((product) =>
      selectedProducts.includes(product.id)
    );
    navigate('/payment', {
      state: {
        orderDetails: {
          cartItems: selectedCartItems,
          totalAmount: selectedCartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        },
      },
    });
  };

  useEffect(() => {
    if (cart.length > 0) {
      saveCartToDatabase();
    }
  }, [cart]);

  return (
    <div className="container">
      <div className="row flex justify-center items-center ">
        <div className="col-8">
          {cart.length === 0 ? (
            <div className="text-center mt-32 ml-32 text-gray-500 text-5xl">
              Your Cart is Empty
            </div>
          ) : (
            <div>
              {cart.map((p) => (
                <div key={p.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id={`product-${p.id}`}
                    checked={selectedProducts.includes(p.id)}
                    onChange={() => handleCheckboxChange(p.id)}
                    className="mr-2"
                  />
                  <CartProduct key={p.id} selectedProduct={p} />
                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleContinue}
                  disabled={isProcessing}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isProcessing ? "Processing..." : "Continue"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;


