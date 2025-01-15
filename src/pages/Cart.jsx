import React, { useContext, useEffect } from 'react';
import { CartContext } from '../Features/ContextProvider';
import CartProduct from '../Components/CartProduct';
import axios from 'axios';

const Cart = () => {
  const { cart } = useContext(CartContext);

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
            
            cart.map((p) => (
              <CartProduct key={p.id} selectedProduct={p} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
