import React from "react";
import storeBcg from "../images/storeBcg.jpeg";

import Cart from "../components/CartPage/Cart";
import Hero from "../components/Hero";

const CartPage = () => {
  return (
    <>
      <Hero img={storeBcg} />
      <Cart />
    </>
  );
};

export default CartPage;
