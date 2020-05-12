import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";

class Stripes extends Component {
  state = {
    stripes: [
      {
        background: "#98c5e9",
        left: 12,
        rotate: 25,
        top: -26,
        delay: 0
      },
      {
        background: "#ffffff",
        left: 36,
        rotate: 25,
        top: -39.7,
        delay: 200
      },
      {
        background: "#98c5e9",
        left: 60,
        rotate: 25,
        top: -49.8,
        delay: 400
      }
    ]
  };
  showStripes = () => {
    return this.state.stripes.map((stripe, i) => {
      return (
        <Animate
          key={i}
          show={true}
          start={{
            background: "#ffffff",
            opacity: 0,
            left: 0,
            rotate: 0,
            top: 0
          }}
          enter={{
            background: [stripe.background],
            opacity: [1],
            left: [stripe.left],
            rotate: [stripe.rotate],
            top: [stripe.top],
            timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
            events: {
              end() {
                console.log("animation finished");
              }
            }
          }}
        >
          {({ opacity, left, rotate, top, background }) => {
            return (
              <div
                className="featured-stripe__item"
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}rem, ${top}rem)`
                }}
              ></div>
            );
          }}
        </Animate>
      );
    });
  };
  render() {
    return <div className="featured-stripe">{this.showStripes()}</div>;
  }
}
export default Stripes;
