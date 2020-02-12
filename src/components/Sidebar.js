import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";

const Sidebar = () => {
  const values = useContext(ProductContext);
  const {
    handleSidebar,
    state: { sidebarOpen, links }
  } = values;
  return (
    <SideWrapper show={sidebarOpen}>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <Link
              onClick={handleSidebar}
              className="sidebar-link"
              to={link.path}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </SideWrapper>
  );
};

const SideWrapper = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--mainGrey);
  z-index: 1;
  border-right: 4px solid var(--primaryColor);
  transition: var(--mainTransition);
  transform: ${props => (props.show ? "translateX(0)" : "translateX(-100%)")};
  ul {
    list-style: none;
    padding: 0;

    .sidebar-link {
      display: block;
      font-size: 1.5rem;
      text-transform: capitalize;
      color: var(--mainBlack);
      padding: 0.5rem 1.5rem;
      background: transparent;
      transition: var(--mainTransition);
      &:hover {
        background: var(--primaryColor);
        color: var(--mainWhite);
        padding: 0.5rem 2rem;
        text-decoration: none;
      }
    }
  }
  @media (min-width: 576px) {
    width: 20rem;
  }
`;

export default Sidebar;
