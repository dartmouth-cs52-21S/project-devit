import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../store/selectors';

import { updateUser } from '../store/actions';
import { uploadImage } from '../store/s3';
import Skills from '../constants/skills.json';
import DarkBG from './DarkBG';

const EditProfile = () => {
  const storedUser = useSelector(selectUser);

  const [user, setUser] = useState({
    picture: '../images/user.svg',
    firstName: '',
    lastName: '',
    roles: [],
    devSkills: [],
    desSkills: [],
  });
  const [file, setFile] = useState();

  useEffect(() => {
    setUser(storedUser);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateUser = () => {
    if (file) {
      uploadImage(file).then((url) => {
        dispatch(updateUser(storedUser.id, { ...user, picture: url }));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      dispatch(updateUser(storedUser.id, { ...user }));
    }
    history.push('/profile');
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
  ];

  return (
    <DarkBG>
      <div className="onboarding">
        <div className="profile-info">
          <div className="user-picture">
            <img src={user.picture} alt="user avatar" />
            <input type="file" name="coverImage" onChange={(e) => onImageUpload(e)} />
          </div>
          <form className="form__form" onSubmit={handleUpdateUser}>
            <div className="user-details">
              <h1>User Details</h1>
              <div className="input-container">
                <input className="input-line" type="text" value={user.firstName} placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                <input className="input-line" type="text" value={user.lastName} placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
              </div>
              <div className="input-container">
                <input className="input-line" type="text" value={user.githubUsername} placeholder="Github Username" onChange={(e) => setUser({ ...user, githubUsername: e.target.value })} />
                <label htmlFor="long">
                  <input type="text"
                    id="long"
                    name="location"
                    value={user.location}
                    placeholder="Add Location"
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                  />
                  <FontAwesomeIcon icon={faMapMarkerAlt} id="icon" size="lg" />
                </label>
              </div>
              <textarea type="text" name="bio" value={user.bio} placeholder="Bio" onChange={(e) => setUser({ ...user, bio: e.target.value })} />
            </div>
          </form>
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
          <section className="form__section" id="skills">
            <h1> Developer Skills</h1>
            <div className="form__checkbox-group">
              {Skills.developer.map((item) => (
                <SelectField key={item} user={user} userArrayKey="devSkills" handleUpdateUserArray={handleUpdateUserArray} fieldName={item} label={item} />
              ))}
            </div>
          </section>
          <section className="form__section" id="skills">
            <h1> Designer Skills</h1>
            <div className="form__checkbox-group">
              {Skills.designer.map((name) => (
                <SelectField key={name} user={user} userArrayKey="desSkills" handleUpdateUserArray={handleUpdateUserArray} fieldName={name} label={name} />
              ))}
            </div>
          </section>
        </div>

        <button type="button"
          className="save"
          onClick={handleUpdateUser}
        >Save
        </button>
      </div>
    </DarkBG>
  );
};

export default EditProfile;

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
