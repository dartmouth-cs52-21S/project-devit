export const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) return '';
  return `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;
};

// placeholder so linter won't complain about not using default export
export const function2 = () => {};
