import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
      console.log(proj.applicants);
      const newProj = proj;
      const newapplicants = proj.applicants;
      newapplicants.push(user.id);
      newProj.applicants = newapplicants;

      dispatch(updateProject(newProj, proj.id));
    } else {
      history.push('/signup');
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <p>{proj.name}</p>
        <p>{proj.applicants}</p>
        <button type="button" onClick={reqToJoin}>
          Request to Join
        </button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ProjectModal;
