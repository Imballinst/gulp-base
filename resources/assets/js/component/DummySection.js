import React, { PropTypes } from 'react';

const DummySection = (props) => (
  <div>
    This is a dummy section {props.route.randomText} haHAA
  </div>
);

DummySection.propTypes = {};

export default DummySection;
