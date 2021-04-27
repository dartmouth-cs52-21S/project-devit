import React from 'react';

const Test = (props) => {
  return (
    <div>
      {' '}
      ID:
      {' '}
      {props.match.params.id}
      {' '}
    </div>
  );
};

export default Test;
