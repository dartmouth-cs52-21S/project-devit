import React from 'react';
import { useParams } from 'react-router-dom';

const Project = ({ title }) => {
  const { projectID } = useParams();

  return (
    <div className="project">
      <h1 className="project__title">{title}</h1>
      <p className="project__id">{`Project ID: ${projectID}` }</p>
    </div>
  );
};

export default Project;
