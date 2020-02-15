import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Product from "../Product";
import Title from "../Title";
import { ProductContext } from "../../context/context";

const Featured = () => {
  const values = useContext(ProductContext);
  const { featureProducts } = values.state;

  console.log("featureProducts:", featureProducts);

  return (
    <section className="py-5">
      <div className="container">
        <Title title="featured products" center />
        <div className="row my-5">
          {featureProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className=" mt-5">
          <div className="col text-center">
            <Link to="/products" className="main-link">
              our products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
