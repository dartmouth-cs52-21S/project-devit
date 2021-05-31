import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProject, updateUser } from '../store/actions/index';
import { selectUser } from '../store/selectors';

import industriesList from '../constants/industries.json';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState([]);
  const [editIndustry, setEditIndustry] = useState(false);
  const [workingIndustry, setWorkingIndustry] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '✨' });
  const [editEmoji, setEditEmoji] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [roles, setRoles] = useState([]);
  const [description, setDescription] = useState([]);
  const [problemDescription, setProblemDescription] = useState('');
  const [audienceDescription, setAudienceDescription] = useState('');
  const [marketDescription, setMarketDescription] = useState('');

  const history = useHistory();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const makeIdea = () => {
    const idea = {
      name: title,
      industry: industry.concat(selectedIndustries),
      logo: chosenEmoji.emoji,
      bio: description,
      problemDescription,
      audienceDescription,
      marketDescription,
    };
    if (!user.projectsCreated) {
      user.projectsCreated = 1;
    } else {
      user.projectsCreated += 1;
    }

    dispatch(updateUser(user.id, user, history));
    dispatch(createProject(idea, history));
  };

  const industries = industry.map((single) => {
    return <p key={single} className="new form__label-text checkbox-label-text">{single}</p>;
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleIndustry = () => {
    setEditIndustry(false);
    setIndustry([...industry, workingIndustry]);
    setWorkingIndustry('');
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
    <div id="new-project">
      {editEmoji
        ? (
          <div className="picker">
            <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '40%' }} />
            <button className="save" type="button" onClick={() => setEditEmoji(false)}>Done!</button>
          </div>
        )
        : (
          <div className="title">
            <button type="button" className="emoji" onClick={() => setEditEmoji(true)}>{chosenEmoji.emoji}</button>
            <input className="title" placeholder="Project title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        )}

      <div className="selector-container">
        <h1>Description</h1>
        <textarea placeholder="Describe your project" rows="4" columns="50" onChange={(e) => setDescription(e.target.value)} />
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
                <button className="add" type="submit" onClick={handleIndustry}>Add</button>
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
        <textarea placeholder="Describe your idea" rows="4" columns="50" onChange={(e) => setProblemDescription(e.target.value)} />
      </div>
      <div className="selector-container">
        <h1>What is your target audience?</h1>
        <textarea placeholder="Describe your customers" rows="4" columns="50" onChange={(e) => setAudienceDescription(e.target.value)} />
      </div>
      <div className="selector-container">
        <h1>Do you plan to market your idea? What is your going to market strategy?</h1>
        <textarea placeholder="Describe your plan" rows="4" columns="50" onChange={(e) => setMarketDescription(e.target.value)} />
      </div>
      <div className="buttons">
        <button className="save" type="submit" onClick={makeIdea}>Save Draft</button>
      </div>

    </div>
  );
};

export default NewProject;
