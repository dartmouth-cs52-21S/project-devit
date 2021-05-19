import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import Post from './post';

const Posts = (props) => {
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const postItems = props.posts.map((post) => {
    return <Post post={post} key={post.id} onClick={() => props.history.push(`/posts/${post.id}`)} />;
  });

  return (
    <div>
      <h1>All Posts</h1>
      {props.error.message !== undefined ? <Alert variant="danger">{props.error.message}</Alert> : <div />}
      <div className="post-container">{postItems}</div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  error: reduxState.posts.error,
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
