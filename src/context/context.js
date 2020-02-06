import React, { useState } from "react";
import { linkData } from "./linkData";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    sidebarOpen: false,
    cartOpen: false,
    cartItems: 0,
    links: linkData
  });

  const handleSidebar = () => {
    setState({ ...state, sidebarOpen: !state.sidebarOpen });
  };

  const handleCart = () => {
    setState({ ...state, cartOpen: !state.cartOpen });
  };

  const closeCart = () => {
    setState({ ...state, cartOpen: false });
  };

  const openCart = () => {
    setState({ ...state, cartOpen: true });
  };

  return (
    <ProductContext.Provider
      value={{ handleSidebar, handleCart, closeCart, openCart, state }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
