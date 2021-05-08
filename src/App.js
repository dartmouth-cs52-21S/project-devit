import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import Posts from './components/posts';
import NewPost from './components/new-post';
import SinglePost from './components/single-post';

const App = (props) => {
  console.log('app is rendering');
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><NavLink exact to="/">My Blog</NavLink></li>
            <li><NavLink to="/posts/new">New Post</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={SinglePost} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
