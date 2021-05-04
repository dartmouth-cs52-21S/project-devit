import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import Post from './post';

const Posts = (props) => {
  useEffect(() => {
    console.log('fetching posts');
    props.fetchPosts();
  }, []);

  const postItems = props.posts.map((post) => {
    return <Post post={post} />;
  });

  return (
    <div>
      all posts
      <div className="post-container">{postItems}</div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
