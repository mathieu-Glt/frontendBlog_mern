import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { getUsers } from './actions/users/users.actions';
import { getPosts } from './actions/post/post.actions';



store.dispatch(getUsers());
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

