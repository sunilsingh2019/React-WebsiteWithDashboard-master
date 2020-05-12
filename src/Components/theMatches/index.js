import React, { Component } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseMatches } from "./../../firebase";
import { firebaseLooper, reverseArray } from "./../ui/misc";
import LeagueTable from "./table";
import MatchesList from "./matchesList";

class TheMatches extends Component {
  state = {
    loading: false,
    matches: [],
    filterMatches: [],
    playedFilter: "All",
    resultFilter: "All"
  };
  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  }

  showPlayedFilter = played => {
    const list = this.state.matches.filter(match => {
      return match.final === played;
    });
    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playedFilter: played,
      // reset to Default (i.e active All) on show Result filter when click on Match-played filter button
      resultFilter: "All"
    });
  };

  playedResultFilter = result => {
    const list = this.state.matches.filter(match => {
      return match.result === result;
    });
    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      resultFilter: result,
      // reset to Default (i.e active All) on show Mactches filter when click on Result filter button
      playedFilter: "All"
    });
  };

  render() {
    return (
      <main className="main">
        <div className="the-matches-container">
          <div className="the-matches">
            <div className="the-matches__filter">
              <div className="match-filter-box">
                <h3 className="match-filter__title heading-tertiary">
                  Filter match
                </h3>
                <div className="match-filter__btns">
                  <button
                    onClick={() => this.showPlayedFilter("All")}
                    className={`btn-filter ${
                      this.state.playedFilter === "All" ? "active" : ""
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => this.showPlayedFilter("Yes")}
                    className={`btn-filter ${
                      this.state.playedFilter === "Yes" ? "active" : ""
                    }`}
                  >
                    Played
                  </button>
                  <button
                    onClick={() => this.showPlayedFilter("No")}
                    className={`btn-filter ${
                      this.state.playedFilter === "No" ? "active" : ""
                    }`}
                  >
                    Not played
                  </button>
                </div>
              </div>

              <div className="match-filter-box">
                <h3 className="match-filter__title heading-tertiary">
                  Filter game result
                </h3>
                <div className="match-filter__btns">
                  <button
                    onClick={() => this.playedResultFilter("All")}
                    className={`btn-filter ${
                      this.state.resultFilter === "All" ? "active" : ""
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => this.playedResultFilter("W")}
                    className={`btn-filter ${
                      this.state.resultFilter === "W" ? "active" : ""
                    }`}
                  >
                    W
                  </button>
                  <button
                    onClick={() => this.playedResultFilter("L")}
                    className={`btn-filter ${
                      this.state.resultFilter === "L" ? "active" : ""
                    }`}
                  >
                    L
                  </button>

                  <button
                    onClick={() => this.playedResultFilter("D")}
                    className={`btn-filter ${
                      this.state.resultFilter === "D" ? "active" : ""
                    }`}
                  >
                    D
                  </button>
                </div>
              </div>
            </div>
            <MatchesList
              loading={this.state.loading}
              matches={this.state.filterMatches}
            />
          </div>
          <div className="league-table">
            <LeagueTable />
          </div>
        </div>
      </main>
    );
  }
}
export default TheMatches;
