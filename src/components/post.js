/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePostAll, updatePost } from '../actions/index';

const Post = (props) => {
  return (
    <div className="post">
      <div onClick={props.onClick}>
        <h1>{props.post.title}</h1>
        <img src={props.post.coverUrl} alt="post gif" />
        <p id="tags">#{props.post.tags}</p>
      </div>
      <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePostAll(props.post.id)} />
    </div>

  );
};

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default connect(mapStateToProps, { fetchPost, deletePostAll, updatePost })(Post);
