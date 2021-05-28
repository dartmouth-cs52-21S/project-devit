import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { fetchProject } from '../store/actions';

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
      <FontAwesomeIcon className="icon" icon={faLightbulb} />

      <ul className="neededTeam__container">
        {neededTeam}
      </ul>
      {/* <p className="project__id">{`Project ID: ${projectID}` }</p> */}
    </div>
  );
};

export default Project;

// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';

// import ReactMarkdown from 'react-markdown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { fetchPost, deletePostSingular, updatePost } from '../store/actions';

// const Project = () => {
//   const [post, setPost] = useState({});
//   const [editing, setEditing] = useState(false);

//   const { postID } = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchPost(postID, (data) => {
//       setPost(data);
//     }));
//   }, []);

//   const editMode = () => {
//     setEditing(true);
//   };

//   const submitEdits = () => {
//     const newUpdatedPost = {
//       title: post.title,
//       content: post.content,
//     };

//     dispatch(updatePost(newUpdatedPost, postID));
//     setEditing(false);
//   };

//   return (
//     <div>
//       {editing
//         ? (
//           <div className="single-project">
//             Title: <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
//             Content: <textarea value={post.content} onChange={(e) => setPost({ ...post, text: e.target.value })} />
//             <button type="button" onClick={submitEdits}> Submit </button>
//             <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
//             {/* add "ARE YOU SURE confirmation" */}
//             <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(post.id, history))} size="2x" />
//           </div>
//         )
//         : (
//           <div className="single-project">
//             <h1>{post.title}</h1>
//             <span><ReactMarkdown>{post.content || ''}</ReactMarkdown></span>
//             <h3>{`Author: ${post.author ? post.author.author : ''} `}</h3>
//             <div id="icons">
//               <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
//               <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(postID, history))} size="2x" />
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default Project;
