import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../store/actions';

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

  const reqToJoin = () => {
    console.log(proj.testApplicants);
    const newProj = proj;
    const applicants = newProj.testApplicants;
    applicants.push('new applicant');
    newProj.testApplicants = applicants;

    console.log(newProj);

    dispatch(updateProject(newProj, proj.id));
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <p>{proj.name}</p>
        <p>{proj.id}</p>
        <p>{proj.testApplicants}</p>
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
