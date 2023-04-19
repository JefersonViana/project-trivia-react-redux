import { email1, name1 } from '../../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case email1:
    return {
      ...state,
      email: action.payload,
    };
  case name1:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default user;
