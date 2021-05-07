import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

const NewPost = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const [tags, setTags] = useState('');

  const makePost = () => {
    const post = {
      title,
      coverUrl: cover,
      tags,
      content,
    };
    props.createPost(post, props.history);
  };

  return (
    <div>
      <h1>New Post</h1>
      <ul>
        <li>Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></li>
        <li>Content: <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} /></li>
        <li>Cover Url: <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} /> </li>
        <li>Tags: <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} /></li>
      </ul>
      <button type="submit" onClick={makePost}>Submit</button>
    </div>
  );
};

export default connect(null, { createPost })(NewPost);
