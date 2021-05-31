import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/selectors';
import { getInitials } from '../utils/utilityFunctions';

export const UserAvatar = ({ useAuthenticatedUser, passedInUser }) => {
  const authenticatedUser = useSelector(selectUser);
  const user = useAuthenticatedUser ? authenticatedUser : passedInUser;

  if (!user) return null;

  const userAvatarClasses = ['user-avatar', ...user.roles].join(' ');

  return (
    <div className={userAvatarClasses}>
      {user.picture ? (
        <img className="user-avatar__image" src={user.picture} alt={`${[user.firstName, user.lastName].join(' ')}`} />
      ) : (
        <div className="user-avatar__initials">{getInitials(user.firstName, user.lastName)}</div>
      )}
    </div>
  );
};

export default UserAvatar;
