import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createPost } from '../store/actions';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const makePost = () => {
    const post = {
      title,
      content,
    };
    dispatch(createPost(post, history));
  };

  return (
    <div className="new-post">
      <h1>New Post</h1>
      <ul>
        <li><h2>Title: </h2><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></li>
        <li><h2>Content: </h2><textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} /></li>
      </ul>
      <button type="submit" onClick={makePost}>Submit</button>
    </div>
  );
};

export default NewPost;
