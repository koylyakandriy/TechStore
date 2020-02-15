import React, { useState, useEffect } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    sidebarOpen: false,
    // cartOpen: false,
    // cartItems: 0,
    links: linkData,
    socialLinks: socialData,
    // cart: [],
    // cartSubTitle: 0,
    // cartTax: 0,
    // cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featureProducts: [],
    singleProduct: {},
    loading: false
  });
  const [cartItems, setCartItems] = useState(0);
  const [cartSubTitle, setCartSubTitle] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(items);
  }, [cart]);

  const setProducts = products => {
    let storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return { id, ...item.fields, image };
    });

    const featureProducts = storeProducts.filter(
      item => item.featured === true
    );

    setState({
      ...state,
      storeProducts,
      filteredProducts: storeProducts,
      featureProducts,
      singleProduct: getStorageProduct(),
      loading: false
    });

    getStorageCart();
    addTotals();
  };

  const getStorageCart = () => [];

  const getStorageProduct = () => [];

  const getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    cart.forEach(item => {
      subTotal += parseFloat(item.total.toFixed(2));
      cartItems += item.count;
    });

    let tax = parseFloat((subTotal * 0.2).toFixed(2));
    let total = parseFloat((subTotal + tax).toFixed(2));

    return {
      cartItems,
      subTotal,
      tax,
      total
    };
  };

  const addTotals = () => {
    const totals = getTotals();
    setCartItems(totals.cartItems);
    setCartSubTitle(totals.subTotal);
    setCartTax(totals.tax);
    setCartTotal(totals.total);
  };

  const syncStorage = () => {};

  const addToCart = id => {
    let tempCart = [...cart];
    const tempProducts = [...state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);
    if (!tempItem) {
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = { ...tempItem, count: 1, total };

      tempCart = [...tempCart, cartItem];
    } else {
      tempItem.count++;
      tempItem.total = parseFloat((tempItem.price * tempItem.count).toFixed(2));
    }

    setCart(tempCart);
    openCart();
    addTotals();
    // syncStorage();
  };
  
  const setSingleProduct = id => {
    console.log("setSingleProduct:", id);
  };

  const handleSidebar = () => {
    setState({ ...state, sidebarOpen: !state.sidebarOpen });
  };

  const handleCart = () => {
    setCartOpen(!cartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return (
    <ProductContext.Provider
      value={{
        cartItems,
        cartSubTitle,
        cartTotal,
        cartTax,
        handleSidebar,
        handleCart,
        closeCart,
        cartOpen,
        addToCart,
        setSingleProduct,
        state
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
