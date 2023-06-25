import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import userReducer from './store/reducer/auth'
import BookReducer from './store/reducer/books'
import PageReducer from './store/reducer/page'


import { Provider } from 'react-redux';
import { createStore, combineReducers, compose  ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
  user: userReducer,
  book: BookReducer,
  page: PageReducer
})
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))


const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
