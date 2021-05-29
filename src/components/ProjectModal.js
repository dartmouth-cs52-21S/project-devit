import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateProject } from '../store/actions';
import { selectisAuthenticated, selectUser } from '../store/selectors';

// const ProjectModal = (props) => {
//   // const [showModal, toggleModal]

//   return (
//     <div id="project__modal__content">
//       <div id="project__title__container">
//         <div className="project__logo">
//           <img src={props.project.logo} alt="confused emoji" />
//         </div>
//         <h1 className="project__title">{props.project.name}</h1>
//       </div>
//       <p>{props.project.bio}</p>
//       <p>{props.project.tools}</p>
//       <p>{props.project.neededTeam}</p>
//     </div>
//   );
// };

// export default ProjectModal;

// // wrap entire find a project page in project__modal

const ProjectModal = ({
  handleClose, show, children, proj,
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectisAuthenticated);
  const history = useHistory();

  const reqToJoin = () => {
    if (isAuthenticated) {
      if (proj.team.includes(user.id)) {
        toast.dark('You are already a member of this project!');
      } else {
        const newProj = proj;
        const newteam = proj.team;
        newteam.push(user.id);
        newProj.applicants = newteam;
        dispatch(updateProject(newProj, proj.id));
      }
    } else {
      history.push('/signup');
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <p>{proj.name}</p>
        <p>Team Members: {proj.team}</p>
        <button type="button" onClick={reqToJoin}>
          Join Team
        </button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ProjectModal;
