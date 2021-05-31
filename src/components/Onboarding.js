import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../store/selectors';

import { updateUser } from '../store/actions';
import { uploadImage } from '../store/s3';
import DarkBG from './DarkBG';

const SelectField = ({
  user, userArrayKey, handleUpdateUserArray, fieldName, label,
}) => {
  const checked = user[userArrayKey]?.includes(fieldName);

  return (
    <label className={`form__label checkbox-label ${checked ? 'checked' : ''}`} htmlFor={fieldName}>
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

const Onboarding = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    location: '',
    picture: '../images/user.png',
    bio: '',
    roles: [],
    skills: [],
  });
  const [file, setFile] = useState();

  const storedUser = useSelector(selectUser);

  useEffect(() => {
    let url = '../images/user.png';
    if (file) { url = window.URL.createObjectURL(file); }
    setUser({ ...user, picture: url });
  }, [file]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateUser = () => {
    if (file) {
      uploadImage(file).then((url) => {
        dispatch(updateUser(storedUser.id, { ...user, picture: url }, history));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      dispatch(updateUser(storedUser.id, user, history));
    }
  };

  const handleUpdateUserArray = (e, userObject, userArrayKey) => {
    let newArray = [];
    const existingRole = userObject[userArrayKey]?.includes(e.target.value);

    if (existingRole) {
      newArray = userObject[userArrayKey].filter((value) => value !== e.target.value);
    } else {
      newArray = [...userObject[userArrayKey], e.target.value];
    }

    setUser({ ...userObject, [userArrayKey]: newArray });
  };

  const onImageUpload = (event) => {
    setFile(event.target.files[0]);
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
      <div className="onboarding">
        <div className="profile-info">
          <div className="user-picture">
            <img src={user.picture} alt="user avatar" />
            <input type="file" name="coverImage" onChange={(e) => onImageUpload(e)} />
          </div>
          <div className="user-details">
            <h1>User Details</h1>
            <div>
              <input type="text" value={user.firstName} placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
              <input type="text" value={user.lastName} placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            </div>
            <label htmlFor="long">
              <input type="text"
                id="long"
                value={user.location}
                placeholder="Add Location"
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
              <FontAwesomeIcon icon={faMapMarkerAlt} id="icon" size="lg" />
            </label>
            <textarea type="text" value={user.bio} placeholder="Bio" onChange={(e) => setUser({ ...user, bio: e.target.value })} />
          </div>
        </div>
        <div className="user-attributes">
          <section className="form__section">
            <h1>Roles</h1>
            <div className="form__checkbox-group">
              {rolesFields.map(({ fieldName, label }) => (
                <SelectField key={fieldName} user={user} userArrayKey="roles" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label} />
              ))}
            </div>
          </section>
          <section className="form__section">
            <h1>Skills</h1>
            <div className="form__checkbox-group">
              {skillsFields.map(({ fieldName, label }) => (
                <SelectField key={fieldName} user={user} userArrayKey="skills" handleUpdateUserArray={handleUpdateUserArray} fieldName={fieldName} label={label} />
              ))}
            </div>
          </section>
        </div>

        <button type="button"
          onClick={() => handleUpdateUser()}
        >Next
        </button>
      </div>
    </DarkBG>
  );
};

export default Onboarding;
