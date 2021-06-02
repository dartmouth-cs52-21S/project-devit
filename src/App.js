import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import NewProject from './components/NewProject';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Onboarding from './components/Onboarding';
import Projects from './components/Projects';
import Project from './components/Project';
import FindProject from './components/FindProject';
import ErrorNotFound from './components/ErrorNotFound';
import LandingPage from './components/LandingPage';
import Modal from './components/Modal';
import { selectModalContentExists } from './store/selectors';
import Chat from './components/Chat';
import Calendar from './components/Calendar';

const App = () => {
  const modalContentExists = useSelector(selectModalContentExists);

  return (
    <Router>
      <div>
        {modalContentExists && <Modal />}
        <Banner />
        <main className="main-section">
          <Sidebar />
          <div className="current-page">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/onboarding" component={Onboarding} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/:projectId" component={Project} />
              <Route exact path="/find-project" component={FindProject} />
              <Route path="/new-project" component={NewProject} />
              <Route path="/chat" component={Chat} />
              <Route path="/calendar" component={Calendar} />
              <Route component={ErrorNotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
