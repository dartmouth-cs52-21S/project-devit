import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../store/actions';
import ProjectModal from './ProjectModal';

const FindProject = (props) => {
  const [displayModal, showModal] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    props.fetchProjects();
  }, []);

  const hideModal = () => {
    showModal(false);
  };

  const presentModal = (event) => {
    setName(event.target.name);
    showModal(true);
  };

  const postProjects = props.projects.map((project) => {
    return (
      <div key={project.id} className="findPostsItem">
        <div> {project.name}</div>
        <Link key={project.id} to={`/projects/${project.id}`}>
          <button type="button" className="button">project page</button>
        </Link>
        <button type="button" name={project.name} onClick={presentModal} className="button">show modal</button>

      </div>

    );
  });

  return (
    <div id="findPostsOuter">
      {postProjects}
      <ProjectModal show={displayModal} handleClose={hideModal}>
        <p>{name}</p>
      </ProjectModal>
    </div>

  );
};

const mapStateToProps = (reduxState) => ({
  projects: reduxState.projects.all,
});

// export default FindProject;
export default connect(mapStateToProps, { fetchProjects })(FindProject);
