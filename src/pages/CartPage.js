import React from "react";
import storeBcg from "../images/storeBcg.jpeg";

import Cart from "../components/CartPage/Cart";
import Hero from "../components/Hero";

const CartPage = ({history}) => {
  return (
    <>
      <Hero img={storeBcg} />
      <Cart history={history}/>
    </>
  );
};

export default CartPage;
