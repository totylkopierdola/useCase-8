const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

export default rootReducer;
