import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions/index';

const NewPost = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const makePost = () => {
    const post = {
      title,
      content,
    };
    props.createPost(post, props.history);
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

export default withRouter(connect(null, { createPost })(NewPost));
