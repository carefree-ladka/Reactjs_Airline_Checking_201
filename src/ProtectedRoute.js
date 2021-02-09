import React from "react";
import { Route, Redirect } from "react-router-dom";

//Higher order component for creating a protectedRoute
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("role")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
