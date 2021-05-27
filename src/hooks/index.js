import { useEffect } from 'react';

// eslint-disable-next-line
export const useDismissOnOutsideClick = (ref, modalContent, onClickOutside) => {
  const handleClickOutside = (event) => {
    if (modalContent && !ref?.current?.contains(event.target)) onClickOutside();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
