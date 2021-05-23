import React from 'react';

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

const ProjectModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ProjectModal;
