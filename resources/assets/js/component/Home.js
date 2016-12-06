import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const Home = (props) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/slides">Slides</Link>
      {' '}
      <Link to="/slides/adv">Slides Adv</Link>
      {' '}
      <Link to="/seats">Seats</Link>
    </header>
    {props.children}
  </div>
);

Home.propTypes = {};

export default Home;
