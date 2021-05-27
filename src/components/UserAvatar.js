import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser, selectUserIsDefined } from '../store/selectors';
import { pluckFirstLetter } from '../utils/utilityFunctions';

export const UserAvatar = ({ useAuthenticatedUser, passedInUser }) => {
  const authenticatedUser = useSelector(selectUser);
  const authenticatedUserIsDefined = useSelector(selectUserIsDefined);

  if (useAuthenticatedUser && !authenticatedUserIsDefined) return null;

  const user = useAuthenticatedUser ? authenticatedUser : passedInUser;

  const userInitials = `${pluckFirstLetter(user.firstName)}${pluckFirstLetter(user.lastName)}`;

  const userAvatarClasses = ['user-avatar', ...user.roles].join(' ');

  return (
    <div className={userAvatarClasses}>
      {user.picture ? (
        <img className="user-avatar__image" src={user.picture} alt={`${[user.firstName, user.lastName].join(' ')}`} />
      ) : (
        <div className="user-avatar__initials">{userInitials}</div>
      )}
    </div>
  );
};

export default UserAvatar;
