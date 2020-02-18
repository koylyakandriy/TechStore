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
    loading: true,
    search: "",
    price: 0,
    min: 0,
    max: 0,
    company: "all",
    shipping: false
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

    let maxPrice = Math.max(...storeProducts.map(item => item.price));

    setState({
      ...state,
      storeProducts,
      filteredProducts: storeProducts,
      featureProducts,
      singleProduct: getStorageProduct(),
      loading: false,
      price: maxPrice,
      max: maxPrice
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
    let tempCart = [...cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = parseFloat((cartItem.count * cartItem.price).toFixed(2));
    setCart([...tempCart]);
  };

  const decrement = id => {
    let tempCart = [...cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count = cartItem.count - 1;
    if (cartItem.count === 0) {
      removeItem(id);
    } else {
      cartItem.total = parseFloat((cartItem.count * cartItem.price).toFixed(2));
      setCart([...tempCart]);
    }
  };

  const removeItem = id => {
    let tempCart = [...cart];
    tempCart = tempCart.filter(item => item.id !== id);
    setCart([...tempCart]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleChange = e => {
    console.log("e:", e);
  };

  const sortData = () => {
    console.log(":sortData");
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
        clearCart,
        handleChange,
        sortData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
