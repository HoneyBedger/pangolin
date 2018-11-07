import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { emit } from './socketClient';

const history = createBrowserHistory();
const defaultState = {
  user: {},
  modal: {},
  contacts: {}
};
const store = createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  compose(applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(emit)),
    (window.devToolsExtension ? window.devToolsExtension() : f => f))
);

export { store, history };
