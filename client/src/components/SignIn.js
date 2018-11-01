import React from 'react';
import { SignForm, SignGrid, FormHeader, InputGroup, Input,
  Label, ButtonPrimary } from './Form/Elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SignIn = (props) => {
  let username, password;
  return (
    <div>
      <FormHeader>Sign In</FormHeader>
      <SignForm>
        <SignGrid>
          <Label htmlFor="signinEmail">Email</Label>
          <InputGroup>
            <FontAwesomeIcon icon="envelope" />
            <Input type="email" id="signinEmail" placeholder="Email"
              ref={(input) => {username = input}} >
            </Input>
          </InputGroup>
          <Label htmlFor="signinPassword">Password</Label>
          <InputGroup>
            <FontAwesomeIcon icon="unlock" />
            <Input type="password" id="signinPassword" placeholder="Password"
              ref={(input) => {password = input}} />
          </InputGroup>
          <ButtonPrimary style={{gridColumn: '2/3'}}>Sign In</ButtonPrimary>
        </SignGrid>
      </SignForm>
    </div>
  );
};


export default SignIn;
