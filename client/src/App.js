import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Chat from './components/Chat/Chat';
import Modal from './components/Modal/Modal';
import { store, history } from './store';
import { connectToSocket } from './socketClient';

// Font-awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faSearch, faEnvelope, faUnlock, faUser, faUserCircle, faPlus,
  faSignOutAlt, faMicrophone, faSmile, faComments, faListUl } from '@fortawesome/free-solid-svg-icons';

library.add(faCog, faSearch, faEnvelope, faUnlock, faUser, faUserCircle,
  faPlus, faSignOutAlt, faMicrophone, faSmile, faComments, faListUl);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/login" exact component={Login} />}/>
              <PrivateRoute path="/" exact component={Chat}
                connectToSocket={() => connectToSocket(store)} />
              <Redirect to="/" />
            </Switch>
          </ConnectedRouter>
          <Modal/>
        </div>
      </Provider>
    );
  }
};

export default App;
