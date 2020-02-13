import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Services from '../components/HomePgae/Services';
import Featured from '../components/HomePgae/Featured';

const HomePage = () => {
  return (
    <>
      <Hero title="awesome gadgets" max="true">
        <Link className="main-link" to="/products" style={{ margin: "2rem" }}>
          Our products
        </Link>
      </Hero>
      <Services/>
      <Featured />
    </>
  );
};

export default HomePage;
