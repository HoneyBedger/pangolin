import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers/index';

const history = createBrowserHistory();
const defaultState = {
  user: {},
  chats: {},
  contacts: {}
};
const store = createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  compose(applyMiddleware(routerMiddleware(history)),
    (window.devToolsExtension ? window.devToolsExtension() : f => f))
);

export { store, history };
