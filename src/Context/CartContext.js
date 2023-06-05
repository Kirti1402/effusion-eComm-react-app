import { createContext, useState } from "react";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [addedToCartList, setAddedToCartList] = useState([]);

  return (
    <cartContext.Provider value={{ addedToCartList, setAddedToCartList }}>
      {children}
    </cartContext.Provider>
  );
};
