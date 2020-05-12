import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import { CityLogo } from "./../ui/icons";

class Header extends Component {
  state = {
    activeNav: false
  };
  activeNav = () => {
    console.log("handle active nav");
  };
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#98c5e9",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e"
        }}
      >
        <ToolBar style={{ display: "flex" }}>
          <div className="header-wrap-lg">
            <CityLogo Link={true} linkTo="/" width="7rem" height="7rem" />
          </div>
          <div className="header-wrap-sm">
            <div className="header-nav">
              <Link
                className="active"
                to="/the_team"
                onClick={() => this.activeNav()}
              >
                The team
              </Link>
              <Link to="/the_matches">Matches</Link>
              <Link to="/sign_in">Dash board</Link>
            </div>
          </div>
        </ToolBar>
      </AppBar>
    );
  }
}

export default Header;
