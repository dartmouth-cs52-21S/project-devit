import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

const NewPost = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const [tags, setTags] = useState('');
  const [comments, setComments] = useState('');

  const makePost = () => {
    const post = {
      title,
      coverUrl: cover,
      tags,
      content,
      comments,
    };
    props.createPost(post, props.history);
  };

  return (
    <div className="new-post">
      <h1>New Post</h1>
      <ul>
        <li><h2>Title: </h2><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></li>
        <li><h2>Content: </h2><textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} /></li>
        <li><h2>Cover Url:</h2> <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} /> </li>
        <li><h2>Tags: </h2><input type="text" value={tags} onChange={(e) => setTags(e.target.value)} /></li>
        <li><h2>Comments: </h2><textarea type="text" value={comments} onChange={(e) => setComments(e.target.value)} /></li>
      </ul>
      <button type="submit" onClick={makePost}>Submit</button>
    </div>
  );
};

export default connect(null, { createPost })(NewPost);
