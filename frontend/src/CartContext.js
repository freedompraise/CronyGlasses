import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalItems: 0,
};

const getInitialState = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : initialState;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCart = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalItems: state.totalItems + action.payload.quantity,
      };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;

    case "REMOVE_FROM_CART":
      const updatedCart = {
        ...state,
        cartItems: state.cartItems.filter(
          (_, index) => index !== action.payload
        ),
        totalItems: state.totalItems - 1,
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  const addToCart = (item, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };

  const removeFromCart = (index) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: index });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export { CartContextProvider, useCart };
