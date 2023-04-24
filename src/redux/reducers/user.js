import { PLAYER_SCORE, PROFILE_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  correctPoint: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PROFILE_DATA:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      correctPoint: state.correctPoint + 1,
    };
  default:
    return state;
  }
};

export default user;
