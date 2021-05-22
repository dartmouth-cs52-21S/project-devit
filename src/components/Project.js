import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../store/actions';

// const mapStateToProps = (reduxState) => ({
//   project: reduxState.initialState.current,
// });

// const Project = ({ title }) => {
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

  return (
    <div className="project">
      <div id="project__title__container">
        <div className="project__logo">
          <img src={project.logo} alt="confused emoji" />
        </div>
        <h1 className="project__title">{project.name}</h1>
      </div>
      <p>{project.bio}</p>
      {/* {project.industry.map((item) => {
        return (
          <div className="project__industry__tag"> {item}</div>
        );
      })} */}
      <p className="project__industry__tag">{project.industry}</p>
      {/* don't need to display project tools right */}
      {/* <p>{project.tools}</p> */}
      <p>{project.neededTeam}</p>

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
