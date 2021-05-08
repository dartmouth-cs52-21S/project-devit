import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePostSingular, updatePost } from '../actions/index';

const SinglePost = (props) => {
  const id = props.match.params.postID;
  const [editing, setEditing] = useState(false);
  const [textEdit, setTextEdit] = useState(props.current.content);
  const [titleEdit, setTitleEdit] = useState(props.current.title);
  const [coverEdit, setCoverEdit] = useState(props.current.coverUrl);
  const [tagsEdit, setTagsEdit] = useState(props.current.tags);

  useEffect(() => {
    props.fetchPost(id);
  }, [id]);

  const editMode = () => {
    setEditing(true);
  };

  const submitEdits = () => {
    const post = {
      title: titleEdit,
      tags: tagsEdit,
      content: textEdit,
      coverUrl: coverEdit,
    };
    props.updatePost(post, props.current.id);
    setEditing(false);
  };

  return (
    <div>
      {editing
        ? (
          <div className="single-post">
            Title: <input type="text" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
            Content: <textarea value={textEdit} onChange={(e) => setTextEdit(e.target.value)} />
            Cover URL: <input type="text" value={coverEdit} onChange={(e) => setCoverEdit(e.target.value)} />
            Tags:<input type="text" value={tagsEdit} onChange={(e) => setTagsEdit(e.target.value)} />
            <button type="button" onClick={submitEdits}> Submit </button>
            <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
            <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePostSingular(props.current.id, props.history)} size="2x" />
          </div>
        )
        : (
          <div className="single-post">
            <h1>{props.current.title}</h1>
            <span><ReactMarkdown>{props.current.content || ''}</ReactMarkdown></span>
            <img src={props.current.coverUrl} alt="cover pic" />
            <p id="tags">#{props.current.tags}</p>
            <div id="icons">
              <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
              <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePostSingular(props.current.id, props.history)} size="2x" />
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default connect(mapStateToProps, { fetchPost, deletePostSingular, updatePost })(SinglePost);
