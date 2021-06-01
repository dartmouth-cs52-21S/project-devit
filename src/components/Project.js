import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { fetchProject, toggleModalVisibility } from '../store/actions';
import Chat from './Chat';
import { ModalMessage } from './Modal';

const Project = () => {
  const [project, setProject] = useState();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProject(projectId, (data) => {
      setProject(data);
    }));
  }, []);

  if (!project) return 'Sorry, we couldn\'t find that project.';

  const industries = project.industry ? (project.industry.map((item) => (
    <p key={item} className="project__industry__tag">{item}</p>
  )))
    : null;

  const neededTeam = project.neededTeam ? (project.neededTeam.map((item) => {
    const designer = 'designer';
    const developer = 'developer';

    if (designer.match(item)) {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="designer__needed" />
          <p>{item}</p>
        </div>
      );
    } else if (developer.match(item)) {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="developer__needed" />
          <p>{item}</p>
        </div>
      );
    } else {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="ideator__needed" />
          <p>{item}</p>
        </div>
      );
    }
  }))
    : null;

  const handleToggleModal = () => dispatch(toggleModalVisibility(
    <ModalMessage
      title="Team Best Practices"
      message="Don't know where to start when building your team? Check out this link to get you started."
      linkHref="https://yourstory.com/2019/06/build-team-for-startup/amp"
      linkText="Team Best Practices"
    />,
  ));

  return (
    <div className="project">
      <div className="project__details">

        <div id="project__title__container">
          <div className="project__logo">{project.logo}</div>
          <h1 className="project__title">{project.name}</h1>
        </div>
        <p>{project.bio}</p>
        <ul>
          {industries}
        </ul>
        <ul>
          <FontAwesomeIcon icon={faLink} />
          <a className="project__links" href={project.GitHub}>GitHub</a>
          <a className="project__links" href={project.Figma}>Figma</a>
          <a className="project__links" href={project.Slack}>Slack</a>
        </ul>
        <div id="best__practices">
          <FontAwesomeIcon className="icon" icon={faLightbulb} />
          <button type="button" className="project__links" onClick={handleToggleModal}>Best Team Practices</button>
        </div>
        <ul className="neededTeam__container">
          {neededTeam}
        </ul>
        <ul className="applicants__container">
          {project.applicants}
        </ul>
      </div>

      <div className="project__chat">
        <Chat />
      </div>
    </div>
  );
};

export default Project;
