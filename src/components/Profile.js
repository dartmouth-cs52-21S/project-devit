/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { selectisAuthenticated, selectUser, selectAllProjects } from '../store/selectors';
import getCommits from '../services/github-api';

// eslint-disable-next-line no-unused-vars
import { signOutUser, fetchProject, fetchProjects } from '../store/actions/index';

library.add(faMapPin);

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectisAuthenticated);
  const [userCommits, setUserCommits] = useState([]);

  const handleSignOut = () => dispatch(signOutUser(history));

  const renderPic = () => {
    let classes = 'profile';
    classes = classes.concat(user.roles.includes('designer') ? ' des' : '');
    classes = classes.concat(user.roles.includes('developer') ? ' dev' : '');
    classes = user.roles.includes('designer') && user.roles.includes('developer') ? 'profile both' : classes;
    return (
      <img className={classes} src={user.picture} alt="profile" />
    );
  };

  const renderProjects = () => {
    const proj = user.projects.map((project) => {
      const descriptions = project.industry.map((ind) => {
        return <h3 key={ind}>{ind}</h3>;
      });
      return (
        <div className="project" key={project.id}>
          <h1>{project.logo}</h1>
          <h2>{project.name}</h2>
          <div className="descriptions">
            {descriptions}
          </div>
        </div>
      );
    });
    return proj;
  };

  useEffect(() => {
    user.projects.map((project) => {
      project.GitHub.map((git) => {
        const index = git.indexOf('github.com/') + 'github.com/'.length;
        const repo = git.substring(index);
        getCommits(repo).then((commits) => {
          commits.map((com) => {
            const author = com.author ? com.author.login : 'unknown';
            const { message } = com.commit;
            const { date } = com.author;
            console.log({ author, message, date });
            const newArray = [
              ...userCommits,
              { author, message, date },
            ];
            console.log('array', newArray);
            setUserCommits(newArray);
            console.log(userCommits);
          });
        });
      });
    });
  }, []);

  const renderActivity = () => {
    console.log('here');
    if (userCommits.length > 0) {
      const activity = userCommits.map((commit) => {
        <div className="activity">
          <h3>Commit from {commit.author}</h3>
          <p>{commit.message}</p>
        </div>;
      });
      return activity;
    }
    return '';
  };

  return (
    <div id="profile">
      <div className="left-side">
        <div className="container">
          <h2>Current Projects</h2>
          {renderProjects()}
        </div>
        <div className="activity-container">
          <h2>Recent Activity</h2>
          {renderActivity()}
        </div>

      </div>
      <div className="right-side">
        <div className="container profile-container">
          <div className="circular--landscape">
            {renderPic()}
          </div>
          <h1>{user.firstName} {user.lastName}</h1>
          <div className="location">
            <FontAwesomeIcon icon={['fas', 'map-pin']} size="lg" />
            <h3>{user.location}</h3>
          </div>
        </div>
        <div className="badges-container">
          <h3>Develop</h3>
          <div className="badges">
            <img src="../../images/cil_badge.png" alt="badge" />
            <img src="../../images/cil_badge.png" alt="badge" />
            <img src="../../images/cil_badge.png" alt="badge" />
          </div>

        </div>
        <div className="badges-container">
          <h3>Design</h3>
          <div className="badges">
            <img src="../../images/cil_badge.png" alt="badge" />
          </div>

        </div>

      </div>
      {/* {isAuthenticated ? <button type="button" onClick={handleSignOut}>Sign Out</button> : <div />} */}
    </div>
  );
};

export default Profile;
