import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import { fetchPosts } from '../store/actions';
import Post from './post';
import { selectAllPosts, selectError } from '../store/selectors';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (!posts) return null;

  return (
    <div>
      <h1>All Posts</h1>
      {error.message && <Alert variant="danger">{error.message}</Alert>}
      <div className="post-container">{posts.map((post) => <Post key={post.id} post={post} />)}</div>
    </div>
  );
};

export default Posts;
