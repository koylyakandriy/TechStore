import React, { useState, useEffect } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    sidebarOpen: false,
    links: linkData,
    socialLinks: socialData,
    storeProducts: [],
    filteredProducts: [],
    featureProducts: [],
    singleProduct: {},
    loading: true
  });
  const [cartItems, setCartItems] = useState(0);
  const [cartSubTotal, setcartSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(items);
  }, []);

  useEffect(() => {
    syncStorage();
    addTotals();
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
  };

  const getStorageCart = () => {
    let cart;
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }

    setCart(cart);
  };

  const getStorageProduct = () => {
    return localStorage.getItem("singleProduct")
      ? JSON.parse(localStorage.getItem("singleProduct"))
      : {};
  };

  const getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;

    cart &&
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
    setcartSubTotal(totals.subTotal);
    setCartTax(totals.tax);
    setCartTotal(totals.total);
  };

  const syncStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

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
    syncStorage();
  };

  const setSingleProduct = id => {
    let product = state.storeProducts.find(item => item.id === id);
    localStorage.setItem("singleProduct", JSON.stringify(product));
    setState({ ...state, singleProduct: product, loading: false });
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

  const increment = id => {
    console.log("id:", id);
  };

  const decrement = id => {
    console.log("id:", id);
  };

  const removeItem = id => {
    console.log("id:", id);
  };

  const clearCart = () => {
    console.log("clear cart");
  };

  return (
    <ProductContext.Provider
      value={{
        cartItems,
        cartSubTotal,
        cartTotal,
        cartTax,
        cartOpen,
        cart,
        state,
        handleSidebar,
        handleCart,
        closeCart,
        addToCart,
        setSingleProduct,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
