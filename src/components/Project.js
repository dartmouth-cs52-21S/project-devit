import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { fetchProject, toggleModalVisibility } from '../store/actions';

// const mapStateToProps = (reduxState) => ({
//   project: reduxState.initialState.current,
// });

const Project = () => {
  const [project, setProject] = useState({});
  //   const [editing, setEditing] = useState(false);

  const { projectID } = useParams();
  //   const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // code to run on component mount
    dispatch(fetchProject(projectID, (data) => {
      setProject(data);
    }));
  }, []);

  const industries = project.industry ? (project.industry.map((item) => {
    return (
      <p key={item} className="project__industry__tag"> {item}</p>
    );
  }))
    : null;

  const neededTeam = project.neededTeam ? (project.neededTeam.map((item) => {
    const designer = 'designer';
    const developer = 'developer';
    // const ideator = 'ideator';

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

  const handleToggleModal = () => dispatch(toggleModalVisibility(<ModalTestComponent />));

  return (
    <div className="project">
      <div id="project__title__container">
        <div className="project__logo">
          <img src={project.logo} alt="emoji" />
        </div>
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
      {/* <p className="project__id">{`Project ID: ${projectID}` }</p> */}
    </div>
  );
};

export default Project;

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
