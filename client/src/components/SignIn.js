import React from 'react';
import { SignForm, SignGrid, FormHeader, InputGroup, Input,
  Label, Button } from './Form/Elements';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faUnlock);


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
          <Button style={{gridColumn: '2/3'}}>Sign In</Button>
        </SignGrid>
      </SignForm>
    </div>
  );
};


export default SignIn;
