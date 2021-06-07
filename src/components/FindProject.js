import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchProjects } from '../store/actions';
import { selectAllProjects } from '../store/selectors';
import industriesList from '../constants/industries.json';
import { ProjectCard } from './Projects';

const FindProject = () => {
  const [searchterm, setSearchTerm] = useState('');
  const [currProjects, setCurrProjects] = useState();

  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);

  const search = (word) => {
    setCurrProjects(projects.filter((project) => project.name.toLowerCase().includes(word.toLowerCase())));
  };

  const filter = (word, field) => {
    setCurrProjects(projects.filter((project) => project[field].includes(word)));
  };

  const clearFilter = () => setCurrProjects(projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
    search(event.target.value);
  };

  const displayedProjects = currProjects ?? projects;

  const industryFilter = industriesList.industries.map((industry) => (
    <Dropdown.Item className="drop-item" eventKey={industry} onSelect={() => filter(industry, 'industry')}>{industry}</Dropdown.Item>
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
      <div id="find-projects-container">{displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      </div>
    </div>
  );
};

export default FindProject;
