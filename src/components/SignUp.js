import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RiCheckboxFill, RiCheckboxBlankLine } from 'react-icons/ri';
import { signUpUser } from '../store/actions';
import { uploadImage } from '../store/s3';
import DarkBG from './DarkBG';

const SelectField = ({
  user, userArrayKey, handleUpdateUserArray, fieldName, label,
}) => {
  const checked = user[userArrayKey].includes(fieldName);

  return (
    <label className={`form__label checkbox-label ${checked ? 'checked' : ''}`} htmlFor={fieldName}>
      <span className="checkbox-icon">
        {checked ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
      </span>
      <p className="form__label-text checkbox-label-text">{label}</p>
      <input
        id={fieldName}
        className="form__checkbox"
        type="checkbox"
        value={fieldName}
        checked={checked}
        onChange={(e) => handleUpdateUserArray(e, user, userArrayKey)}
      />
    </label>
  );
};

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

  console.log(user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUpUser = () => {
    if (file) {
      uploadImage(file).then((url) => {
        dispatch(signUpUser({ ...user, picture: url }, history));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      dispatch(signUpUser(user, history));
    }
  };

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

  const onImageUpload = (event) => {
    setFile(event.target.files[0]);
    if (file) {
      setUser({ picture: window.URL.createObjectURL(file) });
    }
  };

  const rolesFields = [
    { fieldName: 'developer', label: 'Developer' },
    { fieldName: 'designer', label: 'Designer' },
    { fieldName: 'ideator', label: 'Ideator' },
  ];

  const skillsFields = [
    { fieldName: 'react', label: 'React' },
    { fieldName: 'htmlcss', label: 'HTML/CSS' },
  ];

  return (
    <DarkBG>
      <div className="sign-up">
        <h1>Account Info</h1>
        <ul>
          <li><h2>Email:<span id="red">*</span> </h2></li>
          <li><input type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /></li>
          <li><h2>Password:<span id="red">*</span> </h2></li>
          <li><input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} /></li>
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
          <li><input type="file" name="coverImage" onChange={(e) => onImageUpload(e)} /></li>

          <li><h2>Location: </h2></li>
          <li><input type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} /></li>
        </ul>
        <ul>
          <li><h2>Bio: </h2></li>
          <li><textarea type="text" value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} /></li>
        </ul>
        {/* <ul>
          <li><h2>Roles: </h2></li>
          <li>
            <button type="button" onClick={() => setUser({ ...user, roles: user.roles.add('dev') })}>dev</button>
            <button type="button" onClick={() => setUser({ ...user, roles: [...user.roles, 'designer'] })}>designer</button>
            <button type="button" onClick={() => setUser({ ...user, roles: [...user.roles, 'ideator'] })}>ideator</button>
          </li>
        </ul>
        <ul>
          <li><h2>Skills: </h2></li>
          <li>
            <button type="button" onClick={() => setUser({ ...user, skills: [...user.skills, 'react'] })}>React</button>
            <button type="button" onClick={() => setUser({ ...user, skills: [...user.skills, 'html/css'] })}>html/css</button>
          </li>
        </ul> */}
        <section className="form__section">
          <h3 className="form__section-heading">Roles</h3>
          <div className="form__checkbox-group">
            {rolesFields.map(({ fieldName, label }) => (
              <SelectField key={fieldName} user={user} userArrayKey="roles" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label} />
            ))}
          </div>
        </section>
        <section className="form__section">
          <h3 className="form__section-heading">Skills</h3>
          <div className="form__checkbox-group">
            {skillsFields.map(({ fieldName, label }) => (
              <SelectField key={fieldName} user={user} userArrayKey="skills" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label} />
            ))}
          </div>
        </section>
        <button type="button"
          onClick={handleSignUpUser}
        >Sign Up
        </button>
      </div>
    </DarkBG>
  );
};

export default SignUp;
