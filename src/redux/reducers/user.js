import { PLAYER_SCORE, PROFILE_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
      score: 0,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default user;
