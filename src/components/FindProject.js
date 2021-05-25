import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectModal from './ProjectModal';
import { fetchProjects } from '../store/actions';
import { selectAllProjects } from '../store/selectors';

const FindProject = () => {
  const [displayModal, showModal] = useState(false);
  const [name, setName] = useState('');
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const hideModal = () => {
    showModal(false);
  };

  const presentModal = (event) => {
    setName(event.target.name);
    showModal(true);
  };

  const postProjects = projects.map((project) => (
    <div key={project.id} className="findPostsItem">
      <div> {project.name}</div>
      <Link key={project.id} to={`/projects/${project.id}`}>
        <button type="button" className="button">project page</button>
      </Link>
      <button type="button" name={project.name} onClick={presentModal} className="button">show modal</button>
    </div>
  ));

  return (
    <div id="findPostsOuter">
      {postProjects}
      <ProjectModal show={displayModal} handleClose={hideModal}>
        <p>{name}</p>
      </ProjectModal>
    </div>

  );
};

export default FindProject;
