import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faLaptop,
  faGithub,
  faCodeBranch,
  faCalendar,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';

const badgesObject = {
  ideatorBronze: {
    icon: <FontAwesomeIcon icon={faLightbulb} color="sienna" />,
    hoverText: 'Create a Project',
  },
  ideatorSilver: {
    icon: <FontAwesomeIcon icon={faLightbulb} color="silver" />,
    hoverText: 'Create 3 Projects',
  },
  ideatorGold: {
    icon: <FontAwesomeIcon icon={faLightbulb} color="gold" />,
    hoverText: 'Create 5 Projects',
  },
  devitBronze: {
    icon: <FontAwesomeIcon icon={faLaptop} color="sienna" />,
    hoverText: 'Join a Project',
  },
  devitSilver: {
    icon: <FontAwesomeIcon icon={faLaptop} color="silver" />,
    hoverText: 'Join 3 Projects',
  },
  devitGold: {
    icon: <FontAwesomeIcon icon={faLaptop} color="gold" />,
    hoverText: 'Join 5 Projects',
  },
  commitBronze: {
    icon: <FontAwesomeIcon icon={faGithub} color="sienna" />,
    hoverText: 'Make 5 commits with github',
  },
  commitSilver: {
    icon: <FontAwesomeIcon icon={faGithub} color="silver" />,
    hoverText: 'Make 20 commits with github',
  },
  commitGold: {
    icon: <FontAwesomeIcon icon={faGithub} color="gold" />,
    hoverText: 'Make 50 commits with github',
  },
  pullRequestBronze: {
    icon: <FontAwesomeIcon icon={faCodeBranch} color="sienna" />,
    hoverText: 'Make 1 pull request with github',
  },
  pullRequestSilver: {
    icon: <FontAwesomeIcon icon={faCodeBranch} color="silver" />,
    hoverText: 'Make 5 pull requests with github',
  },
  pullRequestGold: {
    icon: <FontAwesomeIcon icon={faCodeBranch} color="gold" />,
    hoverText: 'Make 15 pull requests with github',
  },
  plannerBronze: {
    icon: <FontAwesomeIcon icon={faCalendar} color="sienna" />,
    hoverText: 'Create 1 event on the Calendar',
  },
  plannerSilver: {
    icon: <FontAwesomeIcon icon={faCalendar} color="silver" />,
    hoverText: 'Create 3 events on the Calendar',
  },
  plannerGold: {
    icon: <FontAwesomeIcon icon={faCalendar} color="gold" />,
    hoverText: 'Create 10 events on the Calendar',
  },
  chatterBronze: {
    icon: <FontAwesomeIcon icon={faComments} color="sienna" />,
    hoverText: 'Send 10 messages in the chat',
  },
  chatterSilver: {
    icon: <FontAwesomeIcon icon={faComments} color="silver" />,
    hoverText: 'Send 25 messages in the chat',
  },
  chatterGold: {
    icon: <FontAwesomeIcon icon={faComments} color="gold" />,
    hoverText: 'Send 50 messages in the chat',
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
