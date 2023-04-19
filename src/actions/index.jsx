export const email1 = 'email';
export const name1 = 'name';

export const addEmail = (email) => ({
  type: email1,
  payload: email,
});
export const addName = (name) => ({
  type: name1,
  payload: name,
});
