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
    case "MANAGE_CART_ITEM":
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        const newCart =  {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, existingItemIndex), // Retain items before potential match
            ...(existingItemIndex !== -1 
              ? [
                {
                  ...state.cartItems[existingItemIndex],
                  quantity: state.cartItems[existingItemIndex].quantity + action.payload.quantity,  // Update quantity of matching item
                }, 
          ]
              : [action.payload]), // Add new item to cart
                ...state.cartItems.slice(existingItemIndex + 1), // Retain items after potential match
        ],
         totalItems: state.totalItems + action.payload.quantity
      };

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
      

      case "REMOVE_FROM_CART": {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        const newTotalItems = Math.max(state.totalItems - action.payload.quantity, 0);
        if (existingItemIndex !== -1) {
          let newCart = {
            ...state,
            cartItems: [
              ...state.cartItems.slice(0, existingItemIndex),
              ...state.cartItems.slice(existingItemIndex + 1),
            ],
            totalItems: newTotalItems,
          };
      
          localStorage.setItem("cart", JSON.stringify(newCart));
      
          return newCart;
        } else {
          return state; // No change if item not found
        }
      }
      

    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  const manageCart = (item, quantity) => {
    dispatch({ type: "MANAGE_CART_ITEM", payload: { ...item, quantity } });
  };

  const removeFromCart = (index) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: index });
  };

  const getTotalItems = () => {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ ...state, manageCart, removeFromCart, getTotalItems }}>
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
