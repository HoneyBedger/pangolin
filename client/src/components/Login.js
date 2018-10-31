import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actionCreators from '../actions/actionCreators';
import Logo from './Logo';
import SignIn from './SignIn';
import SignUp from './SignUp';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const LoginGrid = styled.section`
  margin-bottom: 50px;
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
    return (
      <div>
        <Logo/>
        <LoginGrid>
          <SignIn register={this.props.register}/>
          <SignUp />
        </LoginGrid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
