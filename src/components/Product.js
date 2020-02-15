import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch, FaCartPlus } from "react-icons/fa";

import { ProductContext } from "../context/context";

const Product = ({
  product: { id, title, price, image }
}) => {
  const values = useContext(ProductContext);
  const { addToCart, setSingleProduct } = values;

  return (
    <ProductWrapper className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3">
      <div className="card">
        <div className="img-container">
          <img
            className="card-img-top p-5"
            src={image}
            alt="product"
            style={{ height: "320px" }}
          />
          <div className="product-icon">
            <Link to={`/products/${id}`} onClick={() => setSingleProduct(id)}>
              <FaSearch className="icon" />
            </Link>
            <FaCartPlus className="icon" onClick={() => addToCart(id)} />
          </div>
        </div>
        <div className="card-body d-flex justify-content-between">
          <p className="mb-0">{title}</p>
          <p className="mb-0 text-main">${price}</p>
        </div>
      </div>
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  .card {
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.3);
    transition: var(--mainTransition);
    height: 100%;
  }
  .card:hover {
    box-shadow: 7px 10px 5px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .card-img-top {
    transition: var(--mainTransition);
  }
  .card:hover .card-img-top {
    transform: scale(1.15);
    opacity: 0.4;
  }
  .img-container {
    position: relative;
  }

  .product-icon {
    transition: var(--mainTransition);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .icon {
    font-size: 2.5rem;
    margin: 1rem;
    padding: 0.5rem;
    color: var(--primaryColor);
    background: var(--mainBlack);
    border-radius: 0.5rem;
  }
  .card:hover .product-icon {
    opacity: 1;
  }
  .card-body {
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

export default Product;
