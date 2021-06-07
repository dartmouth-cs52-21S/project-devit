import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faLaptop,
  faUserPlus,
  faCalendar,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from '@material-ui/core';

const badgesObject = {
  ideator: {
    thresholds: [1, 3, 5],
  },
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
  devit: {
    thresholds: [1, 3, 5],
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
  commit: {
    thresholds: [5, 20, 50],
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
  planner: {
    thresholds: [1, 3, 10],
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
  chatter: {
    thresholds: [10, 25, 50],
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
  teammate: {
    thresholds: [1, 3, 5],
  },
  teammateBronze: {
    icon: <FontAwesomeIcon icon={faUserPlus} color="sienna" />,
    hoverText: 'Get endorsed by 1 teammate',
  },
  teammateSilver: {
    icon: <FontAwesomeIcon icon={faUserPlus} color="silver" />,
    hoverText: 'Get endorsed by 3 teammates',
  },
  teammateGold: {
    icon: <FontAwesomeIcon icon={faUserPlus} color="gold" />,
    hoverText: 'Get endorsed by 5 teammates',
  },
};

const Badges = (props) => {
  return props.user.badges.map((badge) => (
    <Tooltip key={badge} title={badgesObject[badge].hoverText}>
      <span className="badge-icon">{badgesObject[badge].icon} </span>
    </Tooltip>
  ));
};

export default Badges;
