import { PROFILE_DATA } from '../../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PROFILE_DATA:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

export default user;
