import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faLaptop,
  faCodeBranch,
  faCalendar,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FaGithub } from 'react-icons/fa';
import { Tooltip } from '@material-ui/core';

const badgesObject = {
  ideatorBeginner: {
    icon: <FontAwesomeIcon icon={faLightbulb} color="sienna" />,
    hoverText: 'Create a Project',
  },
  ideatorPro: {
    icon: <FontAwesomeIcon icon={faLightbulb} color="yellow" />,
    hoverText: 'Create 3 Projects',
  },
  devitBeginner: {
    icon: <FontAwesomeIcon icon={faLaptop} color="sienna" />,
    hoverText: 'Join a Project',
  },
  devitPro: {
    icon: <FontAwesomeIcon icon={faLaptop} color="yellow" />,
    hoverText: 'Join 3 Projects',
  },
  githubCommits: {
    icon: <FaGithub />,
    hoverText: 'Make 15 commits with github',
  },
  pullRequestPro: {
    icon: <FontAwesomeIcon icon={faCodeBranch} />,
    hoverText: 'Make 5 pull requests with github',
  },
  planner: {
    icon: <FontAwesomeIcon icon={faCalendar} />,
    hoverText: 'Create 5 events on the Calendar',
  },
  activeChatter: {
    icon: <FontAwesomeIcon icon={faComments} />,
    hoverText: 'Send 25 messages in the chat',
  },
};

const Badges = (props) => {
  return props.user.badges.map((badge) => (
    <Tooltip title={badgesObject[badge].hoverText}>
      <span>{badgesObject[badge].icon} </span>
    </Tooltip>
  ));
};

export default Badges;
