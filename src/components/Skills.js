import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/selectors/index';

const Skills = () => {
  const user = useSelector(selectUser);

  if (!user) return null;

  let combinedSkills = [];

  if (user.desSkills && user.devSkills) combinedSkills = [...user.devSkills, ...user.desSkills];

  return (
    <>
      {combinedSkills.length > 0 && (
        <ul className="skills">
          {combinedSkills.map((skill) => (
            <li key={skill} className="skills__skill">{skill}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Skills;
