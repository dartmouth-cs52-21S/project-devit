/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { deletePostSingular } from '../store/actions';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let tags;

  if (post.tags) {
    const tagsList = post.tags.split(' ');
    tags = tagsList.map((tag) => (<span key={tag}>#{tag} </span>));
  }

  return (
    <div className="post">
      <Link to={`/posts/${post.id}`}><h1>{post.title}</h1></Link>
      <img src={post.coverUrl} alt="post gif" />
      <p id="tags">{tags}</p>
      <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(post.id, history))} size="2x" />
    </div>

  );
};

export default Post;
