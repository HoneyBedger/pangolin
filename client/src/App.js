import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './components/Login';
import Chat from './components/Chat';
import { store, history } from './store';
import socket from './socketClient';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      client: socket()
    };
    this.register = this.register.bind(this);
  }

  register(username, password, name) {
    this.state.client.register(username, password, name, (err, user) => {
      if (err) console.log("error registering", err);
      console.log("registered", user);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" exact
              render={() => <Login register={this.register}/>}/>
            <Route path="/" exact component={Chat} />
            <Redirect to="/login" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
};

export default App;
