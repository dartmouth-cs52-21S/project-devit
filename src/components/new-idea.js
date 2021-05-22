import React, { useState } from 'react';
import { createProject } from '../store/actions/index';

const NewIdea = (props) => {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState([]);
  const [tools, setTools] = useState([]);
  //   const [team, setTeam] = useState([]);
  const [editIndustry, setEditIndustry] = useState(false);
  const [workingIndustry, setWorkingIndustry] = useState('');
  const [editTools, setEditTools] = useState(false);
  const [workingTools, setWorkingTools] = useState('');

  const makeIdea = () => {
    const idea = {
      title,
      industry,
      tools,
    //   team,
    };
    createProject(idea, props.history);
    // props.createProject(idea, props.history);
  };

  const industries = industry.map((single) => {
    return <p key={single}>{single}</p>;
  });

  const handleIndustry = () => {
    setEditIndustry(false);
    setIndustry([...industry, workingIndustry]);
    setWorkingIndustry('');
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
      <input placeholder="Project title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="selector-container">
        <h1>Industry</h1>
        <div className="selector">
          {industries}
          {editIndustry
            ? (
              <div>
                <input placeholder="industry" type="text" onChange={(e) => setWorkingIndustry(e.target.value)} />
                <button type="submit" onClick={handleIndustry}>Add</button>
              </div>
            )
            : <button type="button" onClick={() => setEditIndustry(true)}>+</button>}
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

export default NewIdea;
