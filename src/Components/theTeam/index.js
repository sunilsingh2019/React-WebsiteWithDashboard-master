import React, { Component, Fragment } from "react";

import Fade from "react-reveal";
import CircularProgress from "@material-ui/core/CircularProgress";

import PlayerCard from "./../ui/playerCards";
import Stripes from "./../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "./../../firebase";
import { firebaseLooper } from "./../ui/misc";
import { Promise } from "core-js";

class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  };
  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);

      // use Promise
      const promises = [];
      for (let key in players) {
        // Add new properties called url in players databse
        // url consists the player image url
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }

      // wait until all promise get resolve, then re-set the state
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        });
      });
    });
  }
  showplayersByCategory = category => {
    return this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left key={i} delay={i * 40}>
              <div className="playercard-item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  background={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;
  };

  render() {
    return (
      <main className="main">
        <div
          className="team-container"
          style={{ background: `#fff url(${Stripes})` }}
        >
          <div className="container">
            {!this.state.loading ? (
              <Fragment>
                <div className="team-category">
                  <h2 className="team-category__title heading-secondary">
                    Keepers
                  </h2>

                  <div className="team-category__players">
                    {this.showplayersByCategory("Keeper")}
                  </div>
                </div>

                <div className="team-category">
                  <h2 className="team-category__title heading-secondary">
                    Defence
                  </h2>

                  <div className="team-category__players">
                    {this.showplayersByCategory("Defence")}
                  </div>
                </div>

                <div className="team-category">
                  <h2 className="team-category__title heading-secondary">
                    Midfield
                  </h2>

                  <div className="team-category__players">
                    {this.showplayersByCategory("Midfield")}
                  </div>
                </div>

                <div className="team-category">
                  <h2 className="team-category__title heading-secondary">
                    Striker
                  </h2>

                  <div className="team-category__players">
                    {this.showplayersByCategory("Striker")}
                  </div>
                </div>
              </Fragment>
            ) : (
              // show loading icon
              <div className="progress">
                <CircularProgress
                  style={{
                    color: "#98c6e9"
                  }}
                  thickness={7}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
export default TheTeam;
