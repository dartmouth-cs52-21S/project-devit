import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { createProject } from '../store/actions/index';
import industriesList from '../constants/industries.json';

const NewProject = (props) => {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState([]);
  const [editIndustry, setEditIndustry] = useState(false);
  const [workingIndustry, setWorkingIndustry] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '✨' });
  const [editEmoji, setEditEmoji] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [roles, setRoles] = useState([]);

  const makeIdea = () => {
    const idea = {
      title,
      industry: industry.concat(selectedIndustries),
      logo: chosenEmoji,
    };
    createProject(idea, props.history);
  };

  const industries = industry.map((single) => {
    return <p key={single} className="new">{single}</p>;
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
    <div id="new-idea">
      <div>
        {editEmoji
          ? (
            <div>
              <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '40%' }} />
              <button className="save emoji" type="button" onClick={() => setEditEmoji(false)}>Done!</button>
            </div>
          )
          : <button type="button" className="emoji" onClick={() => setEditEmoji(true)}>{chosenEmoji.emoji}</button>}

      </div>
      <input placeholder="Project title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
              <div>
                <input placeholder="industry" type="text" onChange={(e) => setWorkingIndustry(e.target.value)} />
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
      <div className="buttons">
        <button className="save" type="submit" onClick={makeIdea}>Save Draft</button>
        <button className="review" type="button">Review before posting</button>
      </div>

    </div>
  );
};

export default NewProject;
