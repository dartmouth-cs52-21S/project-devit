import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Posts from './components/posts';
import NewPost from './components/new-post';
import SinglePost from './components/single-post';
import Nav from './components/nav-bar';
import SignIn from './components/sign-in';
import PrivateRoute from './components/private-route';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route path="/signin" component={SignIn} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
