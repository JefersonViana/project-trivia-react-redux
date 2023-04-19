import { combineReducers } from 'redux';

const initialState = {
  xablau: 10,
};

const teste = (state = initialState, action) => {
  switch (action) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  teste,
});

export default rootReducer;
