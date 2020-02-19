import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";

const Sidecart = () => {
  const values = useContext(ProductContext);
  const { cart, closeCart, cartOpen, cartTotal } = values;
  return (
    <CartWrapper show={cartOpen} onClick={closeCart}>
      <ul>
        {cart.map(item => {
          const {
            id,
            image,
            title,
            count,
          } = item;
          return (
            <li key={id} className="cart-item mb-4">
              <img
                width="35"
                // src={`../${image}`}
                src={image}
                alt="cart item" />
              <div className="mt-3">
                <h6 className="text-uppercase">{title}</h6>
                <h6 className="text-title text-capitalize">amount: {count}</h6>
              </div>
            </li>
          );
        })}
      </ul>
      <h4 className="text-capitalize text-main">cart total: ${cartTotal}</h4>
      <div className="text-center my-5">
        <Link to="/cart" className="main-link">
          cart page
        </Link>
      </div>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  height: 100%;
  background: var(--mainGrey);
  z-index: 1;
  transform: ${props => (props.show ? "translateX(0)" : "translateX(100%)")};
  border-left: 4px solid var(--primaryColor);
  transition: var(--mainTransition);
  overflow: scroll;
  padding: 2rem;
  ul {
    padding: 0;
  }

  .cart-item {
    list-style: none;
  }

  @media (min-width: 576px) {
    width: 20rem;
  }
`;

export default Sidecart;
