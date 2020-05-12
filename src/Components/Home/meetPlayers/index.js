import React, { Component } from "react";
import Stripes from "./../../../Resources/images/stripes.png";
import { Tag } from "../../ui/misc";
import Reveal from "react-reveal";
import HomeCards from "./carts";
class MeetPlayers extends Component {
  state = {
    show: false
  };
  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({ show: true });
        }}
      >
        <section
          className="home-meetplayers"
          style={{ background: `#fff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home-meetplayers-wrapper">
              <div className="meetplayer-cards">
                <HomeCards show={this.state.show} />
              </div>
              <div className="meetplayer-text">
                <Tag
                  background="#0d1831"
                  size="10rem"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "2rem"
                  }}
                  className="meetplayer-text__item"
                >
                  Meet
                </Tag>
                <Tag
                  background="#0d1831"
                  size="10rem"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "2rem"
                  }}
                  className="meetplayer-text__item"
                >
                  The
                </Tag>
                <Tag
                  background="#0d1831"
                  size="10rem"
                  color="#fff"
                  add={{
                    display: "inline-block",
                    marginBottom: "2rem"
                  }}
                  className="meetplayer-text__item"
                >
                  Players
                </Tag>
                <div className="link-meet-team">
                  <Tag
                    className="link-meet-team"
                    background="#fff"
                    size="2.7rem"
                    color="#0d1831"
                    link={true}
                    linkTo="/the_team"
                    add={{
                      display: "inline-block",
                      marginBottom: "2.7rem",
                      border: "1px solid #0d1831"
                    }}
                  >
                    Meet all players
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    );
  }
}
export default MeetPlayers;
