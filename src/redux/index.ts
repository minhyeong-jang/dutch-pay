import { combineReducers } from 'redux';

import template from './template';

const rootReducer = combineReducers({
  template,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
