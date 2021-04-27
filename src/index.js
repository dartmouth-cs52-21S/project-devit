import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
// import Nav from './components/nav';
import Welcome from './components/welcome';
import About from './components/about';
import Test from './components/test';
import FallBack from './components/fallback';
import './style.scss';

const App = (props) => {
  console.log('app is rendering');
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/test/id1">test id1</NavLink></li>
            <li><NavLink to="/test/id2">test id2</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route exact path="/test/:id" component={Test} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
