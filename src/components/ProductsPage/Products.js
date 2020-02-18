import React, { useContext } from "react";

import { ProductContext } from "../../context/context";
import Title from "../Title";
import Product from "../Product";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const values = useContext(ProductContext);
  const { filteredProducts } = values;

  return (
    <section className="py-5">
      <div className="container">
        <Title title="our products" center />
        <ProductFilter />
        <div className="row">
          <div className="col-10 mx-auto">
            <h6 className="text-title">
              total products : {filteredProducts.length}
            </h6>
          </div>
        </div>

        <div className="row py-5">
          {filteredProducts.length === 0 ? (
            <div className="col text-center text-title">
              sorry, no items matched your search
            </div>
          ) : (
            filteredProducts.map(product => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
