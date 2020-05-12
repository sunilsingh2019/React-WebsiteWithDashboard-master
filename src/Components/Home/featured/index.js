import React from "react";
import Stripe from "./Stripes";
import Text from "./Text";

const Featured = () => {
  return (
    <section className="featured">
      <div className="featured-container">
        <Stripe />
        <Text />
      </div>
    </section>
  );
};

export default Featured;
