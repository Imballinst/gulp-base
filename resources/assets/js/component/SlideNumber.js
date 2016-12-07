import React, { PropTypes } from 'react';
import * as FirebaseObjects from '../constants/Firebase';
import SlideContent from './SlideContent';

class SlideNumber extends React.Component {
  handleClick(text) {
    const onSlideClick = this.props.onSlideClick;

    return function(e) {
      e.preventDefault();

      onSlideClick(text);
    }
  }

  render() {
    const num = this.props.num;

    return (
      <div>
        <div className="slide-container">
          <h1>
            {num}
          </h1>
          <SlideContent num={num} />
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this.handleClick("prev")}>Prev</button>
          <button type="button" className="btn btn-default" onClick={this.handleClick("next")}>Next</button>
        </div>
      </div>
    );
  }
}

SlideNumber.propTypes = {
  num: PropTypes.number,
  lastAction: PropTypes.string,
  onSlideClick: PropTypes.func,
  onUpdateLastAction: PropTypes.func
};

export default SlideNumber;
