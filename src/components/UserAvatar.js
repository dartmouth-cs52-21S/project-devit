import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser, selectUserIsDefined } from '../store/selectors';

export const UserAvatar = () => {
  const { firstName, lastName, roles, picture } = useSelector(selectUser);
  const userIsDefined = useSelector(selectUserIsDefined);

  if (!userIsDefined) return null;

  const pluckFirstLetter = (string) => string.slice(0, 1);

  const userInitials = `${pluckFirstLetter(firstName)}${pluckFirstLetter(lastName)}`;

  const userAvatarClasses = ['user-avatar', ...roles].join(' ');

  return (
    <div className={userAvatarClasses}>
      {picture ? (
        <img className="user-avatar__image" src={picture} alt={`${[firstName, lastName].join(' ')}`} />
      ) : (
        <div className="user-avatar__image">{userInitials}</div>
      )}
    </div>
  );
};

export default UserAvatar;
