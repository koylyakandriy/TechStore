import React, { useContext } from "react";
import { ProductProvider, ProductContext } from "../context/context";

const HomePage = () => {
  const values = useContext(ProductContext);
  console.log('stateFromHomePage:', values);
  return (
    <>
      <ProductProvider>
        <h3 onClick={values.handleSidebar}>Hello</h3>
      </ProductProvider>
      <h1>Home Page</h1>
    </>
  );
};

export default HomePage;
