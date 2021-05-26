/* eslint-disable comma-spacing */
/* eslint-disable no-multi-spaces */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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

  const valueFields = [
    { fieldName: 'email'    , value: user.email    , label: 'Email'      },
    { fieldName: 'password' , value: user.password , label: 'Password'   },
    { fieldName: 'firstName', value: user.firstName, label: 'First Name' },
    { fieldName: 'lastName' , value: user.lastName , label: 'Last Name'  },
    { fieldName: 'location' , value: user.location , label: 'Location'   },
    { fieldName: 'picture'  , value: user.picture  , label: 'Image URL'  },
    { fieldName: 'bio'      , value: user.bio      , label: 'Bio'        },
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
    <div className="sign-up">
      <div className="sign-up__container">
        <h2 className="sign-up__heading">Account Info</h2>
        <form className="sign-up__form form">
          <section className="sign-up__form-section">
            <h3 className="sign-up__section-heading">Your Profile</h3>
            {valueFields.map(({ fieldName, value, label }) => (
              <InputWithLabel key={fieldName} fieldName={fieldName} value={value} label={label} handleUpdateUserValue={handleUpdateUserValue} />
            ))}
          </section>
          <section className="sign-up__form-section">
            <h3 className="sign-up__section-heading">Roles</h3>
            {rolesFields.map(({ fieldName, label }) => (
              <SelectField key={fieldName} user={user} userArrayKey="roles" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label}  />
            ))}
          </section>
          <section className="sign-up__form-section">
            <h3 className="sign-up__section-heading">Skills</h3>
            {skillsFields.map(({ fieldName, label }) => (
              <SelectField key={fieldName} user={user} userArrayKey="skills" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label}  />
            ))}
          </section>
          <button type="button" className="button full-width" onClick={handleSignUpUser}>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUp;

const InputWithLabel = ({ handleUpdateUserValue, fieldName, label, value }) => {
  return (
    <label className="sign-in__label" htmlFor={fieldName}>
      <p className="sign-in__label-text">{label}<span className="required">*</span></p>
      <input className="sign-in__input-field" type="text" id={fieldName} value={value} onChange={(e) => handleUpdateUserValue(e, fieldName)} />
    </label>
  );
};

const SelectField = ({
  user, userArrayKey, handleUpdateUserArray, fieldName, label,
}) => {
  return (
    <label className="sign-in__label" htmlFor={fieldName}>
      <p className="sign-in__label-text">{label}</p>
      <input
        id={fieldName}
        className="sign-in__checkbox"
        type="checkbox"
        value={fieldName}
        checked={user[userArrayKey].includes(fieldName)}
        onChange={(e) => handleUpdateUserArray(e, user, userArrayKey)}
      />
    </label>
  );
};
