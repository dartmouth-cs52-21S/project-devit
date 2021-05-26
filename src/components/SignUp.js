/* eslint-disable comma-spacing */
/* eslint-disable no-multi-spaces */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signUpUser } from '../store/actions';
import { uploadImage } from '../store/s3';

const SignUp = () => {
  const [file, setFile] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    picture: '',
    bio: '',
    roles: [],
    skills: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateUserValue = (e) => setUser({ ...user, [e.target.id]: e.target.value });

  const handleUpdateUserArray = (e, userObject, userArrayKey) => {
    let newArray = [];
    const existingRole = userObject[userArrayKey].includes(e.target.value);

    if (existingRole) {
      newArray = userObject[userArrayKey].filter((value) => value !== e.target.value);
    } else {
      newArray = [...userObject[userArrayKey], e.target.value];
    }

    setUser({ ...userObject, [userArrayKey]: newArray });
  };

  const handleSignUpUser = () => {
    if (file) {
      uploadImage(file).then((url) => {
        dispatch(signUpUser({ ...user, picture: url }, history));
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const onImageUpload = (event) => {
    setFile(event.target.files[0]);
    if (file) {
      handleUpdateUserValue(window.URL.createObjectURL(file), 'picture');
    }
  };

  return (
    <div className="sign-up">
      <h1>Account Info</h1>
      <ul>
        <li><h2>Email:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.email} onChange={(e) => handleUpdateUserValue(e, 'email')} /></li>
        <li><h2>Password:<span id="red">*</span> </h2></li>
        <li><input type="password" value={user.password} onChange={(e) => handleUpdateUserValue(e, 'password')} /></li>
      </ul>
      <h1>User Info</h1>
      <ul>
        <li><h2>First Name:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.firstName} onChange={(e) => handleUpdateUserValue(e, 'firstName')} /></li>
        <li><h2>Last Name:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.lastName} onChange={(e) => handleUpdateUserValue(e, 'lastName')} /></li>
      </ul>
      <ul>
        <li><h2>Profile Pic: </h2></li>
        <li><input type="file" name="coverImage" onChange={(e) => onImageUpload(e)} /></li>
        <li><h2>Location: </h2></li>
        <li><input type="text" value={user.location} onChange={(e) => handleUpdateUserValue(e, 'location')} /></li>
      </ul>
      <ul>
        <li><h2>Bio: </h2></li>
        <li><textarea type="text" value={user.bio} onChange={(e) => handleUpdateUserValue(e, 'bio')} /></li>
      </ul>
      <ul>
        <li><h2>Roles: </h2></li>
        <li>
          <h3>Developer</h3>
          <input
            type="checkbox"
            value="developer"
            checked={user.roles.includes('developer')}
            onChange={handleUpdateUserArray}
          />
          <h3>Designer</h3>
          <input
            type="checkbox"
            value="designer"
            checked={user.roles.includes('designer')}
            onChange={handleUpdateUserArray}
          />
          <h3>Ideator</h3>
          <input
            type="checkbox"
            value="ideator"
            checked={user.roles.includes('ideator')}
            onChange={handleUpdateUserArray}
          />
        </li>
      </ul>
      <ul>
        <li><h2>Skills: </h2></li>
        <li>
          <h3>React</h3>
          <input
            type="checkbox"
            value="react"
            checked={user.skills.includes('react')}
            onChange={(e) => setUser({ ...user, skills: [...new Set([...user.skills, e.target.value])] })}
          />
          <h3>HTML/CSS</h3>
          <input
            type="checkbox"
            value="html/css"
            checked={user.skills.includes('html/css')}
            onChange={(e) => setUser({ ...user, skills: [...new Set([...user.skills, e.target.value])] })}
          />
        </li>
      </ul>
      <button type="button" className="button" onClick={handleSignUpUser}>Sign Up</button>
    </div>
  );
};

export default SignUp;
