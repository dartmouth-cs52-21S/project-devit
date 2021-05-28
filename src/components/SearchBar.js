import React, { useState } from 'react';

const SearchBar = (props) => {
  const [searchterm, setSearchTerm] = useState('');

  const onInputChange = (event) => {
    console.log('input chanign', searchterm);
    setSearchTerm(event.target.value);
    props.onSearchChange(event.target.value);
  };

  return (
    <div id="search-bar">
      <input onChange={onInputChange} value={searchterm} placeholder="Search..." className="search-bar" />
    </div>
  );
};

export default SearchBar;
