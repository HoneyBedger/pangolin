import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Chat from './components/Chat/Chat';
import { store, history } from './store';
import { connectToSocket } from './socketClient';

// Font-awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faSearch, faEnvelope, faUnlock, faUser, faUserCircle, faPlus,
  faSignOutAlt, faMicrophone, faSmile, faComments, faListUl } from '@fortawesome/free-solid-svg-icons';

library.add(faCog, faSearch, faEnvelope, faUnlock, faUser, faUserCircle,
  faPlus, faSignOutAlt, faMicrophone, faSmile, faComments, faListUl);

class App extends Component {

  /*constructor(props) {
    super(props);
    this.state = {
      client: socket()
    };
    this.register = this.register.bind(this);
  }

  register(username, password, name) {
    this.state.client.register(username, password, name, (err, user) => {
      if (err) {
        console.log("error registering", err);
        return;
      }
      console.log("registered", user);
      this.state.client.login(username, password, (err, user) => {
        if (err) {
          console.log("error logging in", err);
          return;
        }
        console.log("authenticated", user);
      });
    });
  }*/

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" exact component={Login} />}/>
            <PrivateRoute path="/" exact component={Chat}
              connectToSocket={() => connectToSocket(store)} />
            <Redirect to="/" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
};

export default App;
