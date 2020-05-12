import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    // The props (pass througn component) is belong to the react-router
    <Route
      {...rest}
      component={props => {
        return rest.restricted ? (
          user ? (
            // if already log in then redirect to user dashboard
            <Redirect to="/dashboard" />
          ) : (
            // user need to log in to get into uer dashboard
            <Comp {...props} user={user} />
          )
        ) : (
          <Comp {...props} user={user} />
        );
      }}
    />
  );
};

export default PublicRoutes;
