import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import Profile from './components/profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Projects from './components/Projects';
import Project from './components/Project';
import FindProject from './components/FindProject';
import NewProject from './components/NewProject';
import PrivateRoute from './components/PrivateRoute';
import ErrorNotFound from './components/ErrorNotFound';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <div>
        <Banner />
        <main className="main-section">
          <Sidebar />
          <div className="current-page">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/:projectID" component={Project} />
              <Route exact path="/find-project" component={FindProject} />
              <PrivateRoute path="/new-project" component={NewProject} />
              <Route component={ErrorNotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
