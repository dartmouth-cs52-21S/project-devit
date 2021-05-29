import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import ProjectModal from './ProjectModal';
import { fetchProjects, toggleModalVisibility } from '../store/actions';
import { selectAllProjects } from '../store/selectors';

const FindProject = () => {
  const [displayModal, showModal] = useState(false);
  const [proj, setProj] = useState('');
  const [searchterm, setSearchTerm] = useState('');
  const projects = useSelector(selectAllProjects);

  const [currProjects, setCurrProjects] = useState([]);

  const dispatch = useDispatch();

  const search = (word) => {
    setCurrProjects(projects.filter((project) => {
      return project.name.includes(word);
    }));
  };

  const filter = (word) => {
    setCurrProjects(projects.filter((project) => {
      return project.industry.includes(word);
    }));
  };

  useEffect(() => {
    dispatch(fetchProjects());
    setCurrProjects(projects);
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

  const postProjects = currProjects.map((project) => (
    <div key={project.id} className="findPostsItem">
      <div> {project.name}</div>
      <Link key={project.id} to={`/projects/${project.id}`}>
        <button type="button" className="button">project page</button>
      </Link>
      <button type="button" name={project.id} onClick={presentModal} className="button">show modal</button>
    </div>
  ));

  return (
    <div id="findPostsOuter">
      <div className="search-bar">
        <input onChange={(e) => onSearchChange(e)} value={searchterm} placeholder="Search..." className="search-bar" />
      </div>
      <div className="toggle-container">
        <h3>Toggles:</h3>
        <div className="toggle" id="industry">
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic" className="drop-toggle">
              Industry
            </Dropdown.Toggle>

            <Dropdown.Menu className="drop-menu">
              <Dropdown.Item className="drop-item" eventKey="tech" onSelect={filter}>Tech</Dropdown.Item>
              <Dropdown.Item className="drop-item" eventKey="edu" onSelect={filter}>Education</Dropdown.Item>
              <Dropdown.Item className="drop-item" eventKey="science" onSelect={filter}>Science</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {postProjects}
      <button type="button" className="button" onClick={handleToggleModal}>Toggle Redux ⚡️ Powered Modal</button>
      <ProjectModal proj={proj} show={displayModal} handleClose={hideModal} />
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
