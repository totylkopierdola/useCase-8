export const updateField = (field, value) => {
  return {
    type: 'UPDATE_FIELD',
    field,
    value,
  };
};
