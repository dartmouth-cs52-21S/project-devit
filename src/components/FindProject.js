import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../store/actions';
import ProjectModal from './ProjectModal';

const FindProject = (props) => {
  const [displayModal, showModal] = useState(false);
  useEffect(() => {
    props.fetchProjects();
  }, []);

  const hideModal = () => {
    showModal(false);
  };

  const presentModal = () => {
    showModal(true);
  };

  const postProjects = props.projects.map((project) => {
    return (
    // <div key={project.id}>
      <Link key={project.id} to={`/projects/${project.id}`}>
        <div> {project.name}</div>
        <button type="button" onClick={presentModal}>show modal</button>
        <ProjectModal show={displayModal} handleClose={hideModal}>
          <p>{project.name}</p>
        </ProjectModal>
      </Link>

    // </div>

    );
  });

  return (
    <div>
      {postProjects}
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  projects: reduxState.projects.all,
});

// export default FindProject;
export default connect(mapStateToProps, { fetchProjects })(FindProject);
