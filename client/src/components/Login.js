import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUser, registerUser } from '../actions/actionCreators';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { FormHeader } from './Form/Elements';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (username, password) => dispatch(fetchUser(username, password)),
  registerUser: (username, password, name) => dispatch(registerUser(username, password, name))
});

const LoginGrid = styled.section`
  margin-bottom: 50px;
  min-height: calc(100vh - 91px);
  display: grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: 40% 40%;
  @media (max-width: 1199px) {
    grid-template-columns: 45% 45%;
  }
  @media (max-width: 992px) {
    grid-template-columns: 90%;
  }
`;

class Login extends Component {

  render() {
    let user = this.props.user;
    if (user.user && user.user.token) {
      return <Redirect to='/' />;
    } else  {
      return (
        <React.Fragment>
          {user.isLoading && <Loading />}
          <Logo/>
          <ErrorMessage>{user.socketErrMessage}</ErrorMessage>
          <LoginGrid>
            <div>
              <FormHeader>Sign In</FormHeader>
              <SignIn onSubmit={(values) => {
                  console.log('in login:', values);
                  this.props.fetchUser(values.signinEmail.trim(), values.signinPassword.trim());
                }}
                errMessage={user.loginErrMessage}/>
            </div>
            <div>
              <FormHeader>Sign Up</FormHeader>
              <SignUp onSubmit={(values) => {
                  console.log('registering user', values);
                  this.props.registerUser(values.email.trim(), values.password.trim(), values.name.trim());
                }} errMessage={user.registerErrMessage} />
            </div>
          </LoginGrid>
        </React.Fragment>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
