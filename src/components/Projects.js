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

  const makePlural = (string) => `${string}s`;

  const getNeededTeam = () => {
    if (project.neededTeam.length === 0) return '';

    return project.neededTeam.length > 0
      ? (<p className="projects__project-needed-roles">{`Needs ${project.neededTeam.map((role) => makePlural(role)).join(' and ')}`}</p>)
      : (<p className="projects__project-needed-roles">{`Needs ${makePlural(project.neededTeam[0])}`}</p>);
  };

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
          {getNeededTeam()}
        </div>
      </div>
    </li>
  );
};
