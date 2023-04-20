export const PROFILE_DATA = 'PROFILE_DATA';
export const PLAYER_SCORE = 'PLAYER_SCORE';

export const profile = (email, name) => ({
  type: PROFILE_DATA,
  payload: { email, name },
});

export const score = (pontuacao) => ({
  type: PLAYER_SCORE,
  payload: pontuacao,
});
