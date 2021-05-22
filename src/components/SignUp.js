import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUser } from '../store/actions';

const SignUp = () => {
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
  return (
    <div className="sign-up">
      <h1>Account Info</h1>
      <ul>
        <li><h2>Email:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.email} onChange={(e) => setUser({ email: e.target.value })} /></li>
        <li><h2>Password:<span id="red">*</span> </h2></li>
        <li><input type="password" value={user.password} onChange={(e) => setUser({ password: e.target.value })} /></li>
      </ul>
      <h1>User Info</h1>
      <ul>
        <li><h2>First Name:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} /></li>
        <li><h2>Last Name:<span id="red">*</span> </h2></li>
        <li><input type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} /></li>
      </ul>
      <ul>
        <li><h2>Profile Pic: </h2></li>
        <li><input type="text" value={user.picture} onChange={(e) => setUser({ ...user, picture: e.target.value })} /></li>
        <li><h2>Location: </h2></li>
        <li><input type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} /></li>
      </ul>
      <ul>
        <li><h2>Bio: </h2></li>
        <li><textarea type="text" value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} /></li>
      </ul>
      <ul>
        <li><h2>Roles: </h2></li>
        <li>
          <h3>Developer</h3><input type="checkbox" name="dev" onClick={() => setUser({ ...user, roles: [...user.roles, 'dev'] })} />
          <h3>Designer</h3> <input type="checkbox" name="designer" onClick={() => setUser({ ...user, roles: [...user.roles, 'designer'] })} />
          <h3>Idea Person</h3> <input type="checkbox" name="idea" onClick={() => setUser({ ...user, roles: [...user.roles, 'idea'] })} />
        </li>
      </ul>
      <ul>
        <li><h2>Skills: </h2></li>
        <li>
          <h3>React</h3><input type="checkbox" name="react" onClick={() => setUser({ ...user, skills: [...user.skills, 'react'] })} />
          <h3>HTML/CSS</h3> <input type="checkbox" name="html/css" onClick={() => setUser({ ...user, skills: [...user.skills, 'html/css'] })} />
        </li>
      </ul>
      <button type="button"
        onClick={() => dispatch(signUpUser(user, history))}
      >Sign Up
      </button>
    </div>
  );
};

export default SignUp;
