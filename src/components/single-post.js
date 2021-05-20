import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePostSingular, updatePost } from '../store/actions';

const SinglePost = () => {
  const [post, setPost] = useState({});
  const [editing, setEditing] = useState(false);

  const { postID } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(postID, (data) => {
      setPost(data);
    }));
  }, []);

  const editMode = () => {
    setEditing(true);
  };

  const submitEdits = () => {
    const newUpdatedPost = {
      title: post.title,
      content: post.content,
    };

    dispatch(updatePost(newUpdatedPost, postID));
    setEditing(false);
  };

  return (
    <div>
      {editing
        ? (
          <div className="single-post">
            Title: <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
            Content: <textarea value={post.content} onChange={(e) => setPost({ ...post, text: e.target.value })} />
            <button type="button" onClick={submitEdits}> Submit </button>
            <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
            <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(post.id, history))} size="2x" />
          </div>
        )
        : (
          <div className="single-post">
            <h1>{post.title}</h1>
            <span><ReactMarkdown>{post.content || ''}</ReactMarkdown></span>
            <h3>Author: {post.author ? post.author : ''} </h3>
            <div id="icons">
              <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
              <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(postID, history))} size="2x" />
            </div>
          </div>
        )}
    </div>
  );
};

export default SinglePost;
