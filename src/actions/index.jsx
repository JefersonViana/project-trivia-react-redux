export const PROFILE_DATA = 'PROFILE_DATA';

export const profile = (email, name) => ({
  type: PROFILE_DATA,
  payload: { email, name },
});
