import React, { useContext } from "react";
import styled from "styled-components";

import { ProductContext } from "../context/context";

const Footer = () => {
  const values = useContext(ProductContext);
  const {
    state: { socialLinks }
  } = values;

  return (
    <FooterWrapper>
      <div className="container">
        <div className="row py-3">
          <div className="col-md-6 align-items-center">
            <p className="text-capitalize m-0">
              copyright &copy; tech store {new Date().getFullYear()} all rights
              reserved
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-around">
            {socialLinks.map(item => (
              <a href={item.url} key={item.id}>
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: var(--darkGrey);
  color: var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }

  .icon:hover {
    color: var(--primaryColor);
    cursor: pointer;
  }
`;

export default Footer;
