import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

class SelectSeat extends React.Component {
  handleClick(id) {
    const onChangeSeat = this.props.onChangeSeat;

    return function(e) {
      onChangeSeat(id);
    }
  }

  render() {
    const children = this.props.children ? React.cloneElement(this.props.children, {seat: this.props.seat}) : null;
    return (
      <div>
        <header>
          Select Seat:
          {' '}
          <Link onClick={this.handleClick(1)} to="/seats/seat/1">1</Link>
          {' '}
          <Link onClick={this.handleClick(2)} to="/seats/seat/2">2</Link>
          {' '}
          <Link onClick={this.handleClick(3)} to="/seats/seat/3">3</Link>
        </header>
        {children}
      </div>
    );
  }
}

SelectSeat.propTypes = {};

export default SelectSeat;
