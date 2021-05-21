import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronsLeft, FiPlusSquare } from 'react-icons/fi';
import { VscProject } from 'react-icons/vsc';
import { AiOutlineFileSearch } from 'react-icons/ai';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className="sidebar">
      <div className="sidebar__nav-links">
        <SidebarLink route="/projects" label="My Projects" leftIcon={<VscProject />} iconClass="project-icon" />
        <SidebarLink route="/find-a-project" label="Find a Project" leftIcon={<AiOutlineFileSearch />} iconClass="find-icon" />
        <SidebarLink route="/new-idea" label="New Idea" leftIcon={<FiPlusSquare />} iconClass="new-idea-icon" />
      </div>
      <div role="button" tabIndex="0" className={`sidebar__expand-collapse ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleCollapsed}>
        <h4 className="sidebar__nav-link-label">Collapse</h4>
        <span className="icon lg"><FiChevronsLeft /></span>
      </div>
    </nav>
  );
};

export default Sidebar;

const SidebarLink = ({
  route, label, leftIcon, iconClass,
}) => {
  return (
    <NavLink to={route} className="sidebar__nav-link">
      <span className={`icon ${iconClass}`}>{leftIcon}</span>
      <h3 className="sidebar__nav-link-label">{label}</h3>
    </NavLink>
  );
};
