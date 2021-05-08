import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePostSingular, updatePost } from '../actions/index';

const SinglePost = (props) => {
  const id = props.match.params.postID;
  useEffect(() => {
    props.fetchPost(id);
    console.log('use effect', id);
  }, [id]);

  console.log('single post ', props);

  return (
    <div className="single-post">
      <h1>{props.current.title}</h1>
      <span><ReactMarkdown>{props.current.content || ''}</ReactMarkdown></span>
      <img src={props.current.coverUrl} alt="cover pic" />
      <p id="tags">#{props.current.tags}</p>
      <div id="icons">
        <FontAwesomeIcon icon={faEdit} />
        <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePostSingular(props.current.id, props.history)} />
      </div>
    </div>

  );
};

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default connect(mapStateToProps, { fetchPost, deletePostSingular, updatePost })(SinglePost);
