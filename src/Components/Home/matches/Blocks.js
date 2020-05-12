import React, { Component, Fragment } from "react";
import Fade from "react-reveal";

import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "./../../ui/misc";
import MatchesBlock from "./../../ui/matches_blocks";
class Blocks extends Component {
  state = {
    matches: []
  };
  showMatches = matches =>
    matches
      ? matches.map((match, i) => (
          <Fade bottom key={i} delay={i * 40}>
            <div className="match" key={match.id}>
              <MatchesBlock match={match} />
            </div>
          </Fade>
        ))
      : null;
  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          matches: reverseArray(matches)
        });
      });
  }
  render() {
    console.log(this.state.matches);
    return <Fragment>{this.showMatches(this.state.matches)}</Fragment>;
  }
}
export default Blocks;
