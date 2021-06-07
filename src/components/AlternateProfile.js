import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import getCommits from '../services/github-api';
import Badges from './Badges';
import { updateUser, fetchUser } from '../store/actions';

library.add(faMapPin);

const AlternateProfile = () => {
  const [userCommits, setUserCommits] = useState([]);
  const [user, setUser] = useState();
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(userId, (data) => {
      setUser(data);
      if (data.projects) {
        let numUserCommits = 0;
        data.projects.map((project) => {
          project.GitHub.map((git) => {
            const index = git.indexOf('github.com/') + 'github.com/'.length;
            const repo = git.substring(index);

            getCommits(repo).then((commits) => {
              const newArray = commits.map((com) => {
                const author = com.author ? com.author.login : 'unknown';
                if (author === user.githubUsername) {
                  numUserCommits += 1;
                }
                const { message } = com.commit;
                const { date } = com.commit.author;
                return { author, message, date };
              });

              setUserCommits(newArray);
            });

            return '';
          });

          return '';
        });
        const newUser = data;
        newUser.commits = numUserCommits;
        dispatch(updateUser(userId, newUser));
      }
    }));
  }, []);

  const renderActivity = () => {
    if (userCommits && userCommits.length > 0) {
      const activity = userCommits.map((commit) => {
        const date = commit.date.substring(0, 10);
        const time = commit.date.substring(commit.date.indexOf('T') + 1, commit.date.indexOf('T') + 9);
        return (
          <div className="activity" key={commit.message}>
            <h3 className="commit">Commit from {commit.author}, on {date}, at {time}</h3>
            <p className="commit">{commit.message}</p>
          </div>
        );
      });
      return activity;
    }
    return '';
  };

  if (!user) return null;

  const renderPic = () => {
    if (!user) return null;
    let classes = 'profile';
    classes = classes.concat(user.roles.includes('designer') ? ' des' : '');
    classes = classes.concat(user.roles.includes('developer') ? ' dev' : '');
    classes = user.roles.includes('designer') && user.roles.includes('developer') ? 'profile both' : classes;

    return (
      <img className={classes} src={user.picture} alt="profile" />
    );
  };

  const renderProjects = () => {
    if (user.projects) {
      if (user.projects.length === 0) {
        return <h3>You currently do not have any projects</h3>;
      }
      const proj = user.projects.map((project) => {
        if (!project.industry) return '';

        const size = project.industry.length;
        let descriptions = [];
        if (size <= 3) {
          descriptions = project.industry.map((ind) => {
            return <h3 key={ind}>{ind}</h3>;
          });
        } else {
          descriptions.push(<h3>{project.industry[0]}</h3>);
          descriptions.push(<h3>{project.industry[1]}</h3>);
          descriptions.push(<h3 className="more">+{size - 3} more</h3>);
        }

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
        <div className="continer">
          <h2>Recent Activity</h2>
          <div className="activity-container">
            {renderActivity()}
          </div>

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
        <div className="container badges-container">
          <h2>Badges</h2>
          <Badges user={user} />
        </div>

      </div>
    </div>
  );
};

export default AlternateProfile;
