import React from "react";
import { Link } from "react-router-dom";

import mcityLogo from "./../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = props => {
  const template = (
    <img
      src={mcityLogo}
      style={{
        width: props.width,
        height: props.height
      }}
    />
  );

  return props.Link ? (
    <Link to={props.linkTo} className="link_logo">
      {template}
    </Link>
  ) : (
    template
  );
};
