import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const WishListContext = createContext();
const cartReducer = (state, action) => {
  let updatedCart;

  switch (action.type) {
    case "SET":
  const fallbackCart = Array.isArray(action.payload)
    ? action.payload.filter(item => item && typeof item === "object")
    : [];
  localStorage.setItem("cart", JSON.stringify(fallbackCart));
  return fallbackCart;

    case "ADD":
      const exists = state.find(
        (item) =>
          (item.productId || item.id) === (action.product.productId || action.product.id)
      );

      if (exists) {
        updatedCart = state.map((item) =>
          (item.productId || item.id) === (action.product.productId || action.product.id)
            ? {
                ...item,
                quantity: (item.quantity || 1) + (action.product.quantity || 1),
                ...action.product,
              }
            : item
        );
      } else {
        updatedCart = [...state, { ...action.product, quantity: action.product.quantity || 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "REMOVE":
      updatedCart = state.filter((item) => {
        const itemId = item.productId || item.id;
        return itemId !== (action.productId || action.id);
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "UPDATE_QUANTITY":
      updatedCart = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.product];
    case "REMOVE":
  return state.filter((item) => {
    const id = item.productId || item.id;
    return id !== (action.productId || action.id);
  });
    
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, dispatch] = useReducer(cartReducer, localCart);
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);
  const { user } = useAuth();

  const fetchCartFromBackend = useCallback(async () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user?.id || !localStorage.getItem("token")) {
      dispatch({ type: "SET", payload: localCart });
      return;
    }

    try {
      const res = await axiosInstance.get(`/Cart/${user.id}`);
      const items = res.data?.data?.cartItems;

      if (Array.isArray(items) && items.length > 0) {
  dispatch({ type: "SET", payload: items });
  localStorage.setItem("cart", JSON.stringify(items));
} else {
  dispatch({ type: "SET", payload: [] }); 
  localStorage.removeItem("cart");
}

    } catch (error) {
      dispatch({ type: "SET", payload: localCart });
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCartFromBackend();
  }, [fetchCartFromBackend]);

  useEffect(() => {
    if (user?.id && cart.length > 0) {
      axiosInstance.put(`/Cart/${user.id}/update-qty`, {
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity || 1,
        })),
      });
    }
  }, [cart, user?.id]);

  useEffect(() => {
    if (!user?.id || !localStorage.getItem("token")) return;

    axiosInstance
      .get(`/WishList/${user.id}`)
      .then((res) => {
        const items = res.data?.data || [];
        wishlistDispatch({ type: "SET", payload: items });
        localStorage.setItem("wishlist", JSON.stringify(items));
      })
      .catch(() => {
        const local = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistDispatch({ type: "SET", payload: local });
      });
  }, [user?.id]);

  useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


 const addToWishlist = async (productId) => {
  if (!user?.id) return;
  try {
    await axiosInstance.post(`/WishList/${user.id}/add/${productId}`);
    const res = await axiosInstance.get(`/WishList/${user.id}`);
    const updated = res.data?.data || [];
    wishlistDispatch({ type: "SET", payload: updated });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
  }
};


  return (
   <CartContext.Provider
  value={{
    cart,
    dispatch,
    cartCount: Array.isArray(cart) ? cart.length : 0,

    fetchCartFromBackend,
    user,
  }}
>

      <WishListContext.Provider
        value={{ wishlist, wishlistDispatch, addToWishlist }}
      >
        {children}
      </WishListContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishListContext);
