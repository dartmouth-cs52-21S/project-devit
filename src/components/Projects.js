import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { selectUser } from '../store/selectors/index';

const relativeTime = require('dayjs/plugin/relativeTime');

const Projects = () => {
  const { projects } = useSelector(selectUser);

  return (
    <div className="projects">
      <h1 className="projects__heading">Your Projects</h1>
      {projects.length === 0 ? (
        <p className="projects__empty-message">Looks like you don&apos;t have any projects yet</p>
      ) : (
        <ul className="projects__projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;

export const ProjectCard = ({ project }) => {
  dayjs.extend(relativeTime);
  const history = useHistory();

  const handleGoToProject = () => history.push(`/projects/${project.id}`);

  const upperCase = (string) => [string.slice(0, 1).toUpperCase(), string.slice(1)].join('');

  return (
    <li className="projects__project" onClick={handleGoToProject}>
      <div className="projects__project-icon">{project.logo}</div>
      <div className="projects__project-body">
        <h3 className="projects__project-name">{project.name}</h3>
        <div className="projects__project-details-wrapper">
          <p className="projects__project-description">{project.bio}</p>
          <ul className="projects__project-industries">
            {project.industry.slice(0, 3).map((industry) => (
              <li key={industry} className="projects__project-industry">{industry}</li>
            ))}
            {project.industry.slice(3).length > 0 && (
              <li className="projects__more-label">{`+${project.industry.slice(3).length} more`}</li>
            )}
          </ul>
          <div className="projects__project-originally-posted">
            <span className="projects__originally-posted-text">Originally posted</span>
            <span className="projects__originally-posted-date">{dayjs(project.createdAt).fromNow()}</span>
            <span className="projects__originally-posted-text">by</span>
            {project.author ? <span className="projects__originally-posted-by">{`${project.author.firstName} ${project.author.lastName}`}</span> : <span />}
          </div>
          {project.neededTeam.length > 0 && (
            <ul className="projects__project-needed-roles">
              <p className="projects__project-needed-title">Needs:</p>
              {project.neededTeam.map((role) => (
                <li key={role} className="projects__project-needed-role">
                  <div className={`projects__project-needed-icon ${role}`} />
                  <span className="projects__project-needed-label">{`${upperCase(role)}s`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};
