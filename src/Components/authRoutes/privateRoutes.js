import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    // The props from react-router
    <Route
      {...rest}
      component={props => {
        return user ? (
          <Comp {...props} user={user} />
        ) : (
          <Redirect to="/sign_in" />
        );
      }}
    />
  );
};

export default PrivateRoutes;
