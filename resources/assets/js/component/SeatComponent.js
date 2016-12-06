import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

class SeatComponent extends React.Component {
  render() {
    return (
      <div>
        Seat ID: {this.props.seat.currentSeatID}<br />
        Seat name: {this.props.seat.currentSeatName}<br />
        Seat text: {this.props.seat.currentSeatText}
      </div>
    );
  }
}

SeatComponent.propTypes = {};

export default SeatComponent;
