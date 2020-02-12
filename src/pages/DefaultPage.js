import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import defaultBcg from "../images/defaultBcg.jpeg";

const DefaultPage = () => {
  return (
    <>
      <Hero img={defaultBcg} title="404" max="true">
        <h2 className="text-uppercase">page not found</h2>
        <Link className="main-link" to="/" style={{ marginTop: "2rem" }}>
          return home
        </Link>
      </Hero>
    </>
  );
};

export default DefaultPage;
