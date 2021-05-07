import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';

const Posts = (props) => {
  useEffect(() => {
    props.fetchPosts();
  });

  const postItems = props.posts.map((post, id) => {
    // eslint-disable-next-line react/no-array-index-key
    return <Post post={post} key={id} onClick={() => props.history.push(`/post/${post.id}`)} />;
  });

  return (
    <div>
      <h1>All Posts</h1>
      <div className="post-container">{postItems}</div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
