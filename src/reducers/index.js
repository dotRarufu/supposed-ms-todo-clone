import { combineReducers } from 'redux';
import categories from './categories';
import todos from './todos';

const reducers = combineReducers({
  todos,
  categories,
});

export default reducers;
