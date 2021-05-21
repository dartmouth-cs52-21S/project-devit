import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronsLeft } from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className="sidebar">
      <div className="sidebar__nav-links">
        <NavLink to="/projects" className="sidebar__nav-link"><h3 className="sidebar__nav-link-label">My Projects</h3></NavLink>
        <NavLink to="/find-a-project" className="sidebar__nav-link"><h3 className="sidebar__nav-link-label">Find a Project</h3></NavLink>
        <NavLink to="/new-idea" className="sidebar__nav-link"><h3 className="sidebar__nav-link-label">New Idea</h3></NavLink>
      </div>
      <div role="button" tabIndex="0" className={`sidebar__expand-collapse ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleCollapsed}>
        <h4 className="sidebar__nav-link-label">Collapse Sidebar</h4>
        <span className="icon lg"><FiChevronsLeft /></span>
      </div>
    </nav>
  );
};

export default Sidebar;
