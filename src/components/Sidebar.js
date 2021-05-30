import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FiChevronsLeft, FiPlusSquare, FiChevronDown } from 'react-icons/fi';
import { VscProject } from 'react-icons/vsc';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { toggleSidebar } from '../store/actions/index';
import { selectSidebarIsCollapsed } from '../store/selectors';
// import { selectSidebarIsCollapsed, selectUser } from '../store/selectors';
import projectsList from '../data/projects';

const Sidebar = () => {
  const dispatch = useDispatch();
  // const { projects } = useSelector(selectUser);
  // console.log('projects:', projects);
  const { pathname } = useLocation();

  const sidebarIsCollapsed = useSelector(selectSidebarIsCollapsed);

  const toggleCollapsed = () => dispatch(toggleSidebar());

  // Don't show sidebar on the routes indicated below
  if (['/signin', '/signup', '/'].includes(pathname)) return null;

  const chevronIconClasses = ['icon', 'md', 'expand-collapse-icon', sidebarIsCollapsed ? 'flip' : ''].join(' ');

  return (
    <nav className={`sidebar ${sidebarIsCollapsed ? 'collapsed' : ''}`}>
      <ul className="sidebar__nav-links">
        <SidebarLinkWithDropdown route="/projects" label="My Projects" leftIcon={<VscProject />} iconClass="project-icon" projects={projectsList} />
        <SidebarLink route="/find-project" label="Find a Project" leftIcon={<AiOutlineFileSearch />} iconClass="find-icon" />
        <SidebarLink route="/new-project" label="New Project" leftIcon={<FiPlusSquare />} iconClass="new-idea-icon" />
      </ul>
      <div role="button" tabIndex="0" className="sidebar__expand-collapse" onClick={toggleCollapsed}>
        <h4 className="sidebar__nav-link-label collapse-label">Collapse</h4>
        <span className={chevronIconClasses}><FiChevronsLeft /></span>
      </div>
    </nav>
  );
};

export default Sidebar;

const SidebarLink = ({ route, label, leftIcon, iconClass }) => {
  return (
    <li className="sidebar__nav-link-wrapper">
      <NavLink to={route} className="sidebar__nav-link">
        <span className={`icon ${iconClass} md`}>{leftIcon}</span>
        <h3 className="sidebar__nav-link-label">{label}</h3>
      </NavLink>
    </li>
  );
};

const SidebarLinkWithDropdown = ({
  route, label, leftIcon, iconClass, projects,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarIsCollapsed = useSelector(selectSidebarIsCollapsed);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const dropdownIconClasses = ['icon', 'md', 'dropdown-icon', isExpanded ? 'flip' : ''].join(' ');

  return (
    <li className="sidebar__nav-link-wrapper">
      <div className="sidebar__main-link">
        <NavLink to={route} className="sidebar__nav-link with-dropdown">
          <span className={`icon md ${iconClass}`}>{leftIcon}</span>
          <h3 className="sidebar__nav-link-label">{label}</h3>
        </NavLink>
        <div className="sidebar__dropdown" role="button" tabIndex="0" onClick={toggleExpand}>
          <span className={dropdownIconClasses}><FiChevronDown /></span>
        </div>
      </div>
      <div className="sidebar__sublinks-wrapper">
        {!sidebarIsCollapsed && isExpanded && (
          <ul className="sidebar__nav-sublinks">
            {projects.map((project) => (
              <li className="sidebar__nav-sublink" key={project.id}>
                <NavLink to={`/projects/${project.id}`} className="sidebar__link-text">{project.name}</NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};
