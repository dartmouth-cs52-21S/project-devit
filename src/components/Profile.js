import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import { selectUser } from '../store/selectors';
import getCommits from '../services/github-api';
import Badges from './Badges';
import Skills from './Skills';
import { updateUser } from '../store/actions';

library.add(faMapPin);

const Profile = () => {
  const [userCommits, setUserCommits] = useState([]);
  const user = useSelector(selectUser);

  if (!user) return null;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user.projects) {
      let numUserCommits = 0;
      user.projects.map((project) => {
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
      dispatch(updateUser(user.id, { commits: numUserCommits }));
    }
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

  return (
    <div className="profile">
      <div className="profile__team-actions">
        <div className="profile__projects">
          <h2>Current Projects</h2>
          {user.projects.length > 0 ? (
            user.projects.map((project) => (
              <div key={project.id} className="profile__project" onClick={() => { history.push(`/projects/${project.id}`); }} role="button" tabIndex={0}>
                <header className="profile__project-header-row">
                  <span className="profile__project-logo">{project.logo}</span>
                  <h3 className="profile__project-name">{project.name}</h3>
                </header>
                <ul className="profile__project-industries">
                  {project.industry.slice(0, 3).map((industry) => (
                    <li key={industry} className="profile__project-industry">{industry}</li>
                  ))}
                  {project.industry.slice(3).length > 0 && (
                    <li className="profile__more-label">{`+${project.industry.slice(3).length} more`}</li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <>
              <h3 className="profile__no-projects-note">You currently do not have any projects</h3>
              <div className="button-group">
                <button type="button" className="button" onClick={() => history.push('/find-project')}>Find a Project</button>
                <button type="button" className="button" onClick={() => history.push('/new-project')}>Create a Project</button>
              </div>
            </>
          )}
        </div>
        <div className="profile__activity">
          <h2>Recent Activity</h2>
          <div className="activity-container">
            {renderActivity()}
          </div>
        </div>
      </div>
      <div className="profile__user-profile">
        <img className={['profile__user-image', ...user.roles].join(' ')} src={user.picture} alt="profile" />
        <div className="profile__user-details">
          <h1 className="profile__user-name">{user.firstName} {user.lastName}</h1>
          <div className="profile__user-location-wrapper">
            <FontAwesomeIcon icon={['fas', 'map-pin']} size="lg" className="profile__location-icon" />
            <h3 className="profile__user-location">{user.location}</h3>
          </div>
          <p className="profile__user-bio">{user.bio}</p>
        </div>
        <div className="profile__user-skills">
          <h2 className="profile__user-skills-title">Skills</h2>
          <Skills user={user} />
        </div>
        <div className="profile__user-badges">
          <h2 className="profile__user-badges-title">Badges</h2>
          <Badges user={user} />
        </div>
        <button type="button" className="button" onClick={() => history.push('/edit-profile')}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
