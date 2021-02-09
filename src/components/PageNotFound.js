import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  const mystyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <>
      <div style={mystyle}>
        <h2 className="error">Sorry, Page not found</h2>
      </div>
      <div style={mystyle}>
        <h2>
          <NavLink to="/signin">
            please go to <strong>sign in page</strong>
          </NavLink>
        </h2>
      </div>
    </>
  );
};

export default PageNotFound;
