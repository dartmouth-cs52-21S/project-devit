/* eslint-disable comma-spacing */
/* eslint-disable no-multi-spaces */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { RiCheckboxFill, RiCheckboxBlankLine } from 'react-icons/ri';

import { signUpUser } from '../store/actions';
import DarkBG from './DarkBG';

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

  const accountFields = [
    { fieldName: 'email'   , value: user.email   , label: 'Email'    },
    { fieldName: 'password', value: user.password, label: 'Password' },
  ];

  const profileFields = [
    { fieldName: 'firstName', value: user.firstName, label: 'First Name' },
    { fieldName: 'lastName' , value: user.lastName , label: 'Last Name'  },
    { fieldName: 'location' , value: user.location , label: 'Location'   },
    { fieldName: 'picture'  , value: user.picture  , label: 'Image URL'  },
  ];

  const rolesFields = [
    { fieldName: 'developer', label: 'Developer' },
    { fieldName: 'designer' , label: 'Designer'  },
    { fieldName: 'ideator'  , label: 'Ideator'   },
  ];

  const skillsFields = [
    { fieldName: 'react'   , label: 'React'    },
    { fieldName: 'htmlcss' , label: 'HTML/CSS' },
  ];

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

  const handleSignUpUser = () => dispatch(signUpUser(user, history));

  return (
    <DarkBG>
      <div className="sign-up form">
        <div className="form__container">
          <h2 className="form__heading">Sign Up</h2>
          <form className="form__form">
            <section className="form__section">
              <h3 className="form__section-heading">Account</h3>
              {accountFields.map(({ fieldName, value, label }) => (
                <InputWithLabel key={fieldName} fieldName={fieldName} value={value} label={label} handleUpdateUserValue={handleUpdateUserValue} />
              ))}
              <h3 className="form__section-heading">Profile</h3>
              {profileFields.map(({ fieldName, value, label }) => (
                <InputWithLabel key={fieldName} fieldName={fieldName} value={value} label={label} handleUpdateUserValue={handleUpdateUserValue} />
              ))}
              <label className="form__label" htmlFor="bio">
                <p className="form__label-text">Bio<span className="form__required">*</span></p>
                <textarea className="form__textarea" rows="5" id="bio" value={user.bio} onChange={(e) => handleUpdateUserValue(e, 'bio')} />
              </label>
            </section>
            <section className="form__section">
              <h3 className="form__section-heading">Roles</h3>
              <div className="form__checkbox-group">
                {rolesFields.map(({ fieldName, label }) => (
                  <SelectField key={fieldName} user={user} userArrayKey="roles" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label}  />
                ))}
              </div>
            </section>
            <section className="form__section">
              <h3 className="form__section-heading">Skills</h3>
              <div className="form__checkbox-group">
                {skillsFields.map(({ fieldName, label }) => (
                  <SelectField key={fieldName} user={user} userArrayKey="skills" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label}  />
                ))}
              </div>
            </section>
            <button type="button" className="button form__button" onClick={handleSignUpUser}>Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </DarkBG>
  );
};

export default SignUp;

const InputWithLabel = ({ handleUpdateUserValue, fieldName, label, value }) => {
  return (
    <label className="form__label" htmlFor={fieldName}>
      <p className="form__label-text">{label}<span className="form__required">*</span></p>
      <input className="form__input-field" type="text" id={fieldName} value={value} onChange={(e) => handleUpdateUserValue(e, fieldName)} />
    </label>
  );
};

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
