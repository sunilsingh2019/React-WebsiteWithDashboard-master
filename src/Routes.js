import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./Components/authRoutes/PrivateRoutes";
import PublicRoute from "./Components/authRoutes/PublicRoutes";

import Layout from "./HOC/Layout";
import Home from "./Components/Home";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/admin/Dashboard";

import AdminMatches from "./Components/admin/matches";
import AddEditMatch from "./Components/admin/matches/addEditMatches";
import AdminPlayers from "./Components/admin/players";
import AddEditPlayers from "./Components/admin/players/addEditPlayers";
import TheTeam from "./Components/theTeam";
import TheMatches from "./Components/theMatches";
import NotFoundPage from "./Components/ui/notFoundPage";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          component={AddEditPlayers}
          exact
          path="/admin_players/add_players"
        />
        <PrivateRoute
          {...props}
          component={AddEditPlayers}
          exact
          path="/admin_players/edit_player/:id"
        />
        <PrivateRoute
          {...props}
          component={AdminPlayers}
          exact
          path="/admin_players"
        />
        <PrivateRoute
          {...props}
          component={AddEditMatch}
          exact
          path="/admin_matches/add_match"
        />
        <PrivateRoute
          {...props}
          component={AddEditMatch}
          exact
          path="/admin_matches/edit_matche/:id"
        />
        <PrivateRoute
          {...props}
          component={AdminMatches}
          exact
          path="/admin_matches"
        />
        <PrivateRoute
          {...props}
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <PublicRoute
          component={SignIn}
          {...props}
          path="/sign_in"
          restricted={true}
          exact
        />
        <PublicRoute
          component={Home}
          {...props}
          path="/"
          restricted={false}
          exact
        />
        <PublicRoute
          component={TheTeam}
          {...props}
          path="/the_team"
          restricted={false}
          exact
        />
        <PublicRoute
          component={TheMatches}
          {...props}
          path="/the_matches"
          restricted={false}
          exact
        />
        <PublicRoute component={NotFoundPage} restricted={false} exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
