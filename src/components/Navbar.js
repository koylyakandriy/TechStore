import React, { useContext } from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import styled from "styled-components";

import { ProductProvider, ProductContext } from "../context/context";
import logo from "../images/logo.svg";

const Navbar = () => {
  const values = useContext(ProductContext);

  const {
    state: { cartItems },
    handleSidebar,
    handleCart
  } = values;

  return (
    <ProductProvider>
      <NavWrapper>
        <div className="nav-center">
          <FaBars className="nav-icon" onClick={handleSidebar} />
          <img src={logo} alt="tech store logo" />
          <div className="nav-cart">
            <FaCartPlus className="nav-icon" onClick={handleCart} />
            <div className="cart-items">{cartItems}</div>
          </div>
        </div>
      </NavWrapper>
    </ProductProvider>
  );
};

const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--mainGrey);
  border-bottom: 3px solid var(--primaryColor);
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
  }
  .nav-icon {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .nav-cart {
    position: relative;
  }
  .cart-items {
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 0 5px;
    border-radius: 50%;
  }
`;

export default Navbar;
