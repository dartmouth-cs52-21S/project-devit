import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectUser } from '../store/selectors';

import { updateUser } from '../store/actions';
import { uploadImage } from '../store/s3';
import Skills from '../constants/skills.json';
import DarkBG from './DarkBG';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required Field'),
  lastName: Yup.string().required('Required Field'),
  githubUsername: Yup.string(),
  location: Yup.string(),
  bio: Yup.string().max(200),
});

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
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      githubUsername: '',
      location: '',
      bio: '',
    },
    validationSchema,
  });

  const [user, setUser] = useState({
    picture: '../images/user.png',
    roles: [],
    devSkills: [],
    desSkills: [],
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
        dispatch(updateUser(storedUser.id, { ...user, ...formik.values, picture: url }, history));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      dispatch(updateUser(storedUser.id, { ...user, ...formik.values }, history));
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
              <div>
                <input type="text" name="firstName" value={formik.values.firstName} placeholder="First Name" onChange={formik.handleChange} />
                {/* {formik.errors.firstName ? formik.errors.firstName : null} */}
                <input type="text" name="lastName" value={formik.values.lastName} placeholder="Last Name" onChange={formik.handleChange} />
                {/* {formik.errors.lastName ? formik.errors.lastName : null} */}
                <input type="text" name="githubUsername" value={formik.values.githubUsername} placeholder="Github Username" onChange={formik.handleChange} />
                {/* {formik.errors.githubUsername ? formik.errors.githubUsername : null} */}
              </div>
              <label htmlFor="long">
                <input type="text"
                  id="long"
                  name="location"
                  value={formik.values.location}
                  placeholder="Add Location"
                  onChange={formik.handleChange}
                />
                <FontAwesomeIcon icon={faMapMarkerAlt} id="icon" size="lg" />
              </label>
              {/* {formik.errors.location ? formik.errors.location : null} */}
              <textarea type="text" name="bio" value={formik.values.bio} placeholder="Bio" onChange={formik.handleChange} />
              {/* {formik.errors.bio ? formik.errors.bio : null} */}
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
          disabled={!(formik.isValid && formik.dirty)}
          onClick={() => handleUpdateUser()}
        >Next
        </button>
      </div>
    </DarkBG>
  );
};

export default Onboarding;
