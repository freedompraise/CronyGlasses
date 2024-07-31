import { createContext, useContext, useState } from "react";

const OrderHistoryContext = createContext();

export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState(
    JSON.parse(localStorage.getItem("orderHistory")) || []
  );

  const addOrder = (order) => {
    const updatedOrderHistory = [...orderHistory, order];
    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
  };

  return (
    <OrderHistoryContext.Provider value={{ orderHistory, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
