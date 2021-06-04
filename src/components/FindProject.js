/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Badges from '../constants/badges.json';

import ProjectModal from './ProjectModal';
import { fetchProjects, toggleModalVisibility } from '../store/actions';
import { selectAllProjects } from '../store/selectors';
import industriesList from '../constants/industries.json';

const FindProject = () => {
  const [displayModal, showModal] = useState(false);
  const [proj, setProj] = useState('');
  const [searchterm, setSearchTerm] = useState('');
  const projects = useSelector(selectAllProjects);

  const [currProjects, setCurrProjects] = useState();

  const history = useHistory();
  const dispatch = useDispatch();
  const htmlPart = '<FontAwesomeIcon icon={faLightbulb} />';

  const search = (word) => {
    setCurrProjects(projects.filter((project) => {
      return project.name.toLowerCase().includes(word.toLowerCase());
    }));
  };

  const filter = (word, field) => {
    setCurrProjects(projects.filter((project) => {
      return project[field].includes(word);
    }));
  };

  const clearFilter = () => {
    setCurrProjects(projects);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const hideModal = () => {
    showModal(false);
  };

  const presentModal = (event) => {
    let i = 0;
    while (i < currProjects.length) {
      if (currProjects[i].id === event.target.name) {
        setProj(currProjects[i]);
        break;
      }
      i += 1;
    }
    showModal(true);
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
    search(event.target.value);
  };

  const handleToggleModal = () => dispatch(toggleModalVisibility(<ModalTestComponent />));

  const handleGoToProjectPage = (id) => history.push(`/projects/${id}`);

  const industries = (project) => (project.industry ? (project.industry.map((item) => {
    return (
      <p key={item} className="project__industry__tag"> {item}</p>
    );
  }))
    : null);

  const tools = (project) => (project.tools ? (project.tools.map((tool) => {
    return (
      <p key={tool} className="project__industry__tag"> {tool}</p>
    );
  }))
    : null);

  const neededTeam = (project) => (project.neededTeam ? (project.neededTeam.map((item) => {
    const designer = 'designer';
    if (designer.match(item)) {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="designer__needed find-project" />
          <p>{item}</p>
        </div>
      );
    } else {
      return (
        <div className="neededTeam__item" key={item}>
          <p className="developer__needed find-project" />
          <p>{item}</p>
        </div>
      );
    }
  }))
    : null);

  const postProjects = currProjects ? (
    currProjects.map((project) => (
      <div key={project.id} role="button" tabIndex="0" className="findPostsItem" onClick={() => handleGoToProjectPage(project.id)}>
        <div id="project__title__container">
          <div className="project__logo">{project.logo}</div>
          <h1 className="project__title">{project.name}</h1>
        </div>
        <div className="find-project-content">
          <p>{project.bio}</p>
          <div>{industries(project)}</div>
          <div>{tools(project)}</div>
          <div>Needed team:</div>
          <ul className="neededTeam__container">
            {neededTeam(project)}
          </ul>
        </div>
      </div>
    ))
  ) : (
    projects.map((project) => (
      <div key={project.id} role="button" tabIndex="0" className="findPostsItem" onClick={() => handleGoToProjectPage(project.id)}>
        <div id="project__title__container">
          <div className="project__logo">{project.logo}</div>
          <h1 className="project__title">{project.name}</h1>
        </div>
        <div className="find-project-content">
          <p>{project.bio}</p>
          <div>{industries(project)}</div>
          <div>{tools(project)}</div>
          <div>Needed team:</div>
          <ul className="neededTeam__container">
            {neededTeam(project)}
          </ul>
        </div>
      </div>
    ))
  );

  const industryFilter = industriesList.industries.map((industry) => (
    <Dropdown.Item className="drop-item" eventKey={industry} onSelect={() => filter(industry, 'industry')}>{industry}</Dropdown.Item>
  ));

  const teamFilter = ['developer', 'designer'].map((role) => (
    <Dropdown.Item className="drop-item" eventKey={role} onSelect={() => filter(role, 'neededTeam')}>{role}</Dropdown.Item>
  ));

  return (
    <div id="findPostsOuter">
      <h1>Find a project</h1>

      <label htmlFor="long">
        <input type="text"
          id="long"
          className="search"
          value={searchterm}
          placeholder="Search..."
          onChange={(e) => onSearchChange(e)}
        />
        <FontAwesomeIcon icon={faSearch} id="icon" size="lg" />
      </label>
      <div className="toggle-container">
        <h3>Toggles:</h3>
        <div className="toggle" id="industry">
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic" className="drop-toggle">
              Industry
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-menu">
              {industryFilter}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="toggle" id="roles">
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic" className="drop-toggle">
              Needed Roles
            </Dropdown.Toggle>

            <Dropdown.Menu className="drop-menu">
              <Dropdown.Item className="drop-item" eventKey="developer" onSelect={() => filter('developer', 'neededTeam')}>Developer</Dropdown.Item>
              <Dropdown.Item className="drop-item" eventKey="designer" onSelect={() => filter('designer', 'neededTeam')}>Designer</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <p onClick={clearFilter}>
          <span>Clear Filter</span> <FontAwesomeIcon icon={faTimes} size="2x" />
        </p>
      </div>
      <div id="find-projects-container">{postProjects}</div>
    </div>

  );
};

export default FindProject;

const ModalTestComponent = () => (
  <div style={{
    backgroundColor: '#232323',
    height: '30vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ff5D08',
  }}
  >
    <h2 style={{ margin: '0 0 0.75rem' }}>I&apos;m in the modal 🎉</h2>
    <p>Click outside the border to dismiss me! ✌️</p>
  </div>
);
