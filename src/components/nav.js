/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as NavLink } from 'react-router-dom';
import '../style.scss';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
