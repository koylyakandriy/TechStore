import React, { useState, useEffect } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    sidebarOpen: false,
    cartOpen: false,
    cartItems: 0,
    links: linkData,
    socialLinks: socialData,
    cart: [],
    cartItem: 0,
    cartSubTitle: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    singleProduct: {},
    loading: true
  });

  useEffect(() => {}, []);

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
