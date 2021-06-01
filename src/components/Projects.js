import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/selectors/index';

const Projects = () => {
  const { projects } = useSelector(selectUser);

  return (
    <div className="projects">
      <h1 className="projects__heading">Your Projects</h1>
      {projects.length === 0 ? (
        <p className="projects__empty-message">Looks like you don&apos;t have any projects yet</p>
      ) : (
        <ul className="projects__projects-list">
          <li className="projects__project">
            <div className="projects__project-icon">🎉</div>
            <div className="projects__project-body">
              <h3 className="projects__project-name">LiveWell</h3>
              <div className="projects__project-details-wrapper">
                <p className="projects__project-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro natus nostrum, tempore incidunt dignissimos aperiam nemo officia quas?</p>
                <ul className="projects__project-industries">
                  <li className="projects__project-industry">Health Care</li>
                  <li className="projects__project-industry">Tech</li>
                  <li className="projects__project-industry">Crypto</li>
                  <li className="projects__more-label">+3 more</li>
                </ul>
                <div className="projects__project-originally-posted">
                  <span className="projects__originally-posted-text">Originally posted</span>
                  <span className="projects__originally-posted-date">6 days ago</span>
                  <span className="projects__originally-posted-text">by</span>
                  <span className="projects__originally-posted-by">Aaron Morgan</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Projects;
