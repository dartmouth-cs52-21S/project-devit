import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { createProject } from '../store/actions/index';
import industriesList from '../constants/industries.json';

const NewProject = (props) => {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState([]);
  const [tools, setTools] = useState([]);
  const [editIndustry, setEditIndustry] = useState(false);
  const [workingIndustry, setWorkingIndustry] = useState('');
  const [editTools, setEditTools] = useState(false);
  const [workingTools, setWorkingTools] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState({ emoji: '✨' });
  const [editEmoji, setEditEmoji] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const makeIdea = () => {
    const idea = {
      title,
      industry: industry.concat(selectedIndustries),
      tools,
      logo: chosenEmoji,
    };
    createProject(idea, props.history);
  };

  const industries = industry.map((single) => {
    return <p key={single} className="new">{single}</p>;
  });

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
  };

  const handleIndustry = () => {
    setEditIndustry(false);
    setIndustry([...industry, workingIndustry]);
    setWorkingIndustry('');
  };

  const addIndustry = (ind) => {
    console.log(selectedIndustries);
    let newArray = [];
    const exists = selectedIndustries?.includes(ind);
    if (exists) {
      newArray = selectedIndustries.filter((value) => value !== ind);
    } else {
      newArray = [...selectedIndustries, ind];
    }
    setSelectedIndustries(newArray);
  };

  const renderTools = tools.map((single) => {
    return <p key={single}>{single}</p>;
  });

  const handleTools = () => {
    setEditTools(false);
    setTools([...tools, workingTools]);
    setWorkingTools('');
  };

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
        <h1>Tools</h1>
        <div className="selector">
          {renderTools}
          {editTools
            ? (
              <div>
                <input placeholder="tools" type="text" onChange={(e) => setWorkingTools(e.target.value)} />
                <button type="submit" onClick={handleTools}>Add</button>
              </div>
            )
            : <button type="button" onClick={() => setEditTools(true)}>+</button>}
        </div>
      </div>
      <div className="selector-container">
        <h1>Team</h1>
      </div>
      <div className="buttons">
        <button className="save" type="submit" onClick={makeIdea}>Save Draft</button>
        <button className="review" type="button">Review before posting</button>
      </div>

    </div>
  );
};

export default NewProject;
