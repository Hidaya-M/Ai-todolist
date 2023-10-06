import React from "react";
import "./Error.css";
import Header from "../Header/header";
import Footer from "../Footer/Footer";
const Eroor = () => {
  return (
    <>
      <Header />
      <div className="error">
        <h1>
          4
          <span>
            <i className="fas fa-ghost" />
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
      </div>
      <Footer />
    </>
  );
};

export default Eroor;
