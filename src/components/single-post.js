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

  let tags, comments;

  if (post.tags) { tags = post.tags.split(' ').map((tag) => { return (<span key={tag}>#{tag} </span>); }); }
  if (post.comments) { comments = post.comments.split(',').map((com) => { return (<li key={com}>{com} </li>); }); }

  const editMode = () => {
    setEditing(true);
  };

  const submitEdits = () => {
    const newUpdatedPost = {
      title: post.title,
      tags: post.tags,
      content: post.content,
      comments: post.comments,
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
            {/* Cover URL: <input type="text" value={post.coverUrl} onChange={(e) => setPost({ ...post, coverUrl: e.target.value })} /> */}
            Tags:<input type="text" value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} />
            Comments: <textarea value={post.comments} onChange={(e) => setPost({ ...post, comments: e.target.value })} />
            <button type="button" onClick={submitEdits}> Submit </button>
            <FontAwesomeIcon icon={faEdit} onClick={editMode} size="2x" />
            <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePostSingular(post.id, history))} size="2x" />
          </div>
        )
        : (
          <div className="single-post">
            <h1>{post.title}</h1>
            <span><ReactMarkdown>{post.content || ''}</ReactMarkdown></span>
            {/* <img src={post.coverUrl} alt="cover pic" /> */}
            <p id="tags">{tags}</p>
            <h3>Comments:</h3>
            <ul>{comments}</ul>
            <h3>Author: {post.author ? post.author.author : ''} </h3>
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
