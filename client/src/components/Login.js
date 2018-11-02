import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUser } from '../actions/actionCreators';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Loading from './Loading';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (username, password) => dispatch(fetchUser(username, password))
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
    if (this.props.user.user && this.props.user.user.token) {
      return <Redirect to='/' />;
    } else  {
      return (
        <React.Fragment>
          {this.props.user.isLoading && <Loading />}
          <Logo/>
          <LoginGrid>
            <SignIn login={(username, password) => {
                this.props.fetchUser(username, password);
              }}
              errMessage={this.props.user.errMessage}/>
            <SignUp />
          </LoginGrid>
        </React.Fragment>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
