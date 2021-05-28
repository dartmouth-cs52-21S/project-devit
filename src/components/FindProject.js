import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectModal from './ProjectModal';
import { fetchProjects, fetchProject, toggleModalVisibility } from '../store/actions';
import { selectAllProjects } from '../store/selectors';

const FindProject = () => {
  const [displayModal, showModal] = useState(false);
  const [proj, setProj] = useState('');
  /* currently anything the modal needs to display has to be stored in state */
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const hideModal = () => {
    showModal(false);
  };

  const join = () => {
    console.log('join attempted');
  };

  const presentModal = (event) => {
    dispatch(fetchProject(event.target.name, (data) => {
      setProj(data);
    }));
    showModal(true);
  };

  const handleToggleModal = () => dispatch(toggleModalVisibility(<ModalTestComponent />));

  const postProjects = projects.map((project) => (
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
      {postProjects}
      <button type="button" className="button" onClick={handleToggleModal}>Toggle Redux ⚡️ Powered Modal</button>
      <ProjectModal proj={proj} show={displayModal} handleClose={hideModal} reqToJoin={join} />
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
