import React, { useContext } from "react";
import styled from "styled-components";

import { ProductContext } from "../context/context";

const Sidecart = () => {
  const values = useContext(ProductContext);
  const {
    state: {  cart },
    closeCart,
    cartOpen
  } = values;

  return (
    <CartWrapper show={cartOpen} onClick={closeCart}>
      <h1>cart items</h1>
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
  @media (min-width: 576px) {
    width: 20rem;
  }
`;

export default Sidecart;
