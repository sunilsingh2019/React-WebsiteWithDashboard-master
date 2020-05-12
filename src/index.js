import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";

import "./scss/main.scss";
import Routes from "./Routes";
import { firebase } from "./firebase";

let App = props => {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  );
};
firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
