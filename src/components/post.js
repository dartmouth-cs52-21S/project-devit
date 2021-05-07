import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePost, updatePost } from '../actions/index';

const Post = (props) => {
  const deleteP = () => {
    console.log('trying to delete');
    props.deletePost(props.post.id, props.history);
  };

  return (
    <div className="post">
      <h1>{props.post.title}</h1>
      <ReactMarkdown>{props.post.content || ''}</ReactMarkdown>
      <img src={props.post.coverUrl} alt="post gif" />
      <p id="tags">#{props.post.tags}</p>
      <FontAwesomeIcon icon={faEdit} />
      <FontAwesomeIcon icon={faTrash} onClick={deleteP} />
    </div>

  );
};

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
