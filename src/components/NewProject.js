import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProject, updateUser } from '../store/actions/index';
import { selectUser } from '../store/selectors';

import industriesList from '../constants/industries.json';

const validationSchema = Yup.object({
  title: Yup.string().required('Required Field'),
  description: Yup.string().required('Required Field'),
  problemDescription: Yup.string().max(200),
  audienceDescription: Yup.string().max(200),
  marketDescription: Yup.string().max(200),
});

const NewProject = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      problemDescription: '',
      audienceDescription: '',
      marketDescription: '',
    },
    validationSchema,
  });

  const [industry, setIndustry] = useState([]);
  const [editIndustry, setEditIndustry] = useState(false);
  const [workingIndustry, setWorkingIndustry] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '✨' });
  const [editEmoji, setEditEmoji] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [roles, setRoles] = useState([]);

  const history = useHistory();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const makeProject = () => {
    const newProject = {
      name: formik.values.title,
      industry: industry.concat(selectedIndustries),
      logo: chosenEmoji.emoji,
      bio: formik.values.description,
      problemDescription: formik.values.problemDescription,
      audienceDescription: formik.values.audienceDescription,
      marketDescription: formik.values.marketDescription,
      neededTeam: roles,
      author: user.id,
    };

    if (!user.projectsCreated) {
      user.projectsCreated = 1;
    } else {
      user.projectsCreated += 1;
    }

    dispatch(updateUser(user.id, user));

    dispatch(createProject(newProject, history));

    history.push('/projects');
  };

  const industries = industry.map((single) => {
    return <p key={single} className="new form__label-text checkbox-label-text">{single}</p>;
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleAddCustomIndustry = () => {
    setEditIndustry(false);
    setWorkingIndustry('');

    if (workingIndustry.length === 0) return;
    setIndustry([...industry, workingIndustry]);
  };

  const addIndustry = (ind) => {
    let newArray = [];
    const exists = selectedIndustries?.includes(ind);
    if (exists) {
      newArray = selectedIndustries.filter((value) => value !== ind);
    } else {
      newArray = [...selectedIndustries, ind];
    }
    setSelectedIndustries(newArray);
  };

  const addRole = (role) => {
    let newArray = [];
    const exists = roles?.includes(role);
    if (exists) {
      newArray = roles.filter((value) => value !== role);
    } else {
      newArray = [...roles, role];
    }
    setRoles(newArray);
  };

  const rolesFields = [
    { fieldName: 'developer', label: 'Developers' },
    { fieldName: 'designer', label: 'Designers' },
  ];
  return (
    <form className="form__form" onSubmit={makeProject}>
      <div id="new-project">
        {editEmoji
          ? (
            <div className="picker">
              <Picker onEmojiClick={onEmojiClick} />
              <button className="button save" type="button" onClick={() => setEditEmoji(false)}>Done!</button>
            </div>
          )
          : (
            <div className="title">
              <button type="button" className="button emoji" onClick={() => setEditEmoji(true)}>{chosenEmoji.emoji}</button>
              <input className="title" placeholder="Project title..." type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
            </div>
          )}

        <div className="selector-container">
          <h1>Description</h1>
          <textarea placeholder="Describe your project" rows="4" columns="50" name="description" value={formik.values.description} onChange={formik.handleChange} />
        </div>
        <div className="selector-container">
          <h1>Industry</h1>
          <div className="selector">
            {industriesList.industries.map((single) => {
              const checked = selectedIndustries?.includes(single);
              return (
                <div key={single}>
                  <label className={`form__label checkbox-label ${checked ? 'checked' : ''}`} htmlFor={single}>
                    <p className="form__label-text checkbox-label-text">{single}</p>
                    <input className="form__checkbox" type="checkbox" id={single} onChange={() => addIndustry(single)} />
                  </label>
                </div>

              );
            })}

            {industries}
            {editIndustry
              ? (
                <div className="add-ind">
                  <input className="add" placeholder="industry" type="text" onChange={(e) => setWorkingIndustry(e.target.value)} />
                  <button className="add" type="submit" onClick={handleAddCustomIndustry}>Add</button>
                </div>
              )
              : <button className="add" type="button" onClick={() => setEditIndustry(true)}>+</button>}
          </div>
        </div>
        <div className="selector-container">
          <h1>I need...</h1>
          <div className="selector">
            {rolesFields.map(({ fieldName, label }) => {
              const checked = roles?.includes(fieldName);
              return (
                <div key={fieldName}>
                  <label className={`form__label checkbox-label ${checked ? 'checked' : ''}`} htmlFor={fieldName}>
                    <p className="form__label-text checkbox-label-text">{label}</p>
                    <input className="form__checkbox" type="checkbox" id={fieldName} onChange={() => addRole(fieldName)} />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="selector-container">
          <h1>What is the problem you are solving? Why is it important?</h1>
          <textarea placeholder="Describe your idea" rows="4" columns="50" name="problemDescription" value={formik.values.problemDescription} onChange={formik.handleChange} />
        </div>
        <div className="selector-container">
          <h1>What is your target audience?</h1>
          <textarea placeholder="Describe your customers" rows="4" columns="50" name="audienceDescription" value={formik.values.audienceDescription} onChange={formik.handleChange} />
        </div>
        <div className="selector-container">
          <h1>Do you plan to market your idea? What is your going to market strategy?</h1>
          <textarea placeholder="Describe your plan" rows="4" columns="50" name="marketDescription" value={formik.values.marketDescription} onChange={formik.handleChange} />
        </div>
        <div className="buttons">
          <button className="button save" type="submit" disabled={!(formik.isValid && formik.dirty)}>Share</button>
        </div>
      </div>
    </form>
  );
};

export default NewProject;
