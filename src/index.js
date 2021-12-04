import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  todos: [
    {
      title: 'Assignment at Chemistry',
      id: 'default id',
      completed: false,
      color: '#3f3b3b',
      categoryId: 'default',
      steps: [
        { name: 'Answer page 87', completed: false, id: 'default step id 1' },
        {
          name: 'Research about covalent bonds',
          completed: true,
          id: 'default step id 2',
        },
      ],
    },
  ],
  categories: [{ name: 'School', selected: true, id: 'default' }],
};
const store = createStore(
  reducers,
  JSON.parse(localStorage.getItem('todos')) || initialState,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
