import React, { Component } from "react";
import { easePolyOut, easeExpOut } from "d3-ease";
import Animate from "react-move/Animate";

import FeaturedPlayer from "./../../../Resources/images/featured_player.png";

class Text extends Component {
  animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured-text__number"
            style={{
              opacity,
              transform: `translate(26rem, 17rem) rotateY(${rotate}deg)`
            }}
          >
            3
          </div>
        );
      }}
    </Animate>
  );
  animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 50.3,
        y: 45
      }}
      enter={{
        opacity: [1],
        x: [27.3],
        y: [45.0]
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured-text__first"
            style={{
              opacity,
              transform: `translate(${x}rem, ${y}rem)`
            }}
          >
            League
          </div>
        );
      }}
    </Animate>
  );
  animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 50.3,
        y: 58.6
      }}
      enter={{
        opacity: [1],
        x: [27.3],
        y: [58.6],
        timing: {
          delay: 300,
          duration: 500,
          ease: easePolyOut
        }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured-text__second"
            style={{
              opacity,
              transform: `translate(${x}rem, ${y}rem)`
            }}
          >
            Championships
          </div>
        );
      }}
    </Animate>
  );
  animatePlayer = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0
        }}
        enter={{
          opacity: [1],
          timing: {
            delay: 800,
            duration: 500,
            ease: easeExpOut
          }
        }}
      >
        {({ opacity }) => {
          return (
            <div
              className="featured-text__player"
              style={{
                opacity,
                background: `url(${FeaturedPlayer})`,
                transform: `translate(55rem, 20.1rem)`
              }}
            ></div>
          );
        }}
      </Animate>
    );
  };
  render() {
    return (
      <div className="featured-text">
        {this.animatePlayer()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
      </div>
    );
  }
}
export default Text;
