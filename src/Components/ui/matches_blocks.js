import React, { Fragment } from "react";

const MatchesBlock = ({ match }) => {
  return (
    <Fragment>
      <div className="match__date">
        {match.final ? match.date : `Match not played yet:${match.date}`}
      </div>
      <div className="match__group">
        <div className="club club-top">
          <div className="club__info">
            <div className="club-icon">
              <img src={`/images/team_icons/${match.localThmb}.png`} />
            </div>
            <div className="club-name">{match.local}</div>
          </div>
          <div className="club__score">
            {match.final ? match.resultLocal : "-"}
          </div>
        </div>

        <div className="club club-bottom">
          <div className="club__info">
            <div className="club-icon">
              <img src={`/images/team_icons/${match.awayThmb}.png`} />
            </div>
            <div className="club-name">{match.away}</div>
          </div>
          <div className="club__score">
            {match.final ? match.resultAway : "-"}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MatchesBlock;
