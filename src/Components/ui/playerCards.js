import React, { Component, Fragment } from "react";

class PlayerCards extends Component {
  render() {
    return (
      <Fragment>
        <div className="playercard-item__img">
          <img src={`${this.props.background}`} />
        </div>
        <div className="playercard-item__number">{this.props.number}</div>
        <div className="playercard-item__name">
          <span>{this.props.name}</span>
          <span>{this.props.lastname}</span>
        </div>
      </Fragment>
    );
  }
}
export default PlayerCards;
