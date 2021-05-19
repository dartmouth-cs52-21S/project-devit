import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { fetchPost, deletePostSingular, updatePost } from '../actions/index';

const SinglePost = (props) => {
  const id = props.match.params.postID;
  const [editing, setEditing] = useState(false);
  const [textEdit, setTextEdit] = useState(props.current.content);
  const [titleEdit, setTitleEdit] = useState(props.current.title);
  const [coverEdit, setCoverEdit] = useState(props.current.coverUrl);
  const [tagsEdit, setTagsEdit] = useState(props.current.tags);
  const [commentsEdit, setCommentsEdit] = useState(props.current.comments);
  let tags, comments;

  useEffect(() => {
    props.fetchPost(id);
    setTitleEdit(props.current.title);
    setTextEdit(props.current.content);
    setCoverEdit(props.current.coverUrl);
    setTagsEdit(props.current.tags);
    setCommentsEdit(props.current.comments);
  }, [props.current.title]);

  if (props.current.tags) { tags = props.current.tags.split(' ').map((tag) => { return (<span key={tag}>#{tag} </span>); }); }
  if (props.current.comments) { comments = props.current.comments.split(',').map((com) => { return (<li key={com}>{com} </li>); }); }

  const editMode = () => {
    setEditing(true);
  };

  const submitEdits = () => {
    const post = {
      title: titleEdit,
      tags: tagsEdit,
      content: textEdit,
      coverUrl: coverEdit,
      comments: commentsEdit,
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
            Comments: <textarea value={commentsEdit} onChange={(e) => setCommentsEdit(e.target.value)} />
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
            <p id="tags">{tags}</p>
            <h3>Comments:</h3>
            <ul>{comments}</ul>
            <h3>Author: {props.current.author ? props.current.author.author : ''} </h3>
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

export default withRouter(connect(mapStateToProps, { fetchPost, deletePostSingular, updatePost })(SinglePost));
