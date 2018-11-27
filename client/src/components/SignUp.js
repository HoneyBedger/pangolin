import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { SignForm, SignGrid, ValidatedInput, Label, ButtonPrimary } from './Form/Elements';
import ErrorMessage from './ErrorMessage';

const Prompt = styled.p`
  text-align: right;
  color: #fcb150;
  font-size: 0.8rem;
  margin-top: 0px;
`;

// Validators
const required = value => value && value.trim().length > 0 ? undefined : 'Required';
const minLength5 = value => !value || value.trim().length < 5 ? 'Must be at least 5 characters' : undefined;
const maxLength20 = value => value && value.trim().length > 20 ? 'Must be at most 20 characters' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim()) ?
  'Invalid email address' : undefined;
const matchesPassword = (value, allValues) => value !== allValues.password ? 'Passwords must match' : undefined;

const SignUp = ({ handleSubmit, errMessage, pristine, reset, submitting }) => {
  return (
    <SignForm onSubmit={handleSubmit}>
      <ErrorMessage>{errMessage}</ErrorMessage>
      <Prompt>(All fields are required)</Prompt>
      <SignGrid>
        <Label htmlFor="email">Email</Label>
        <Field name="email" type="email" id="email" placeholder="Email"
          icon="envelope" component={ValidatedInput} validate={[required, email]} />
        <Label htmlFor="name">Name</Label>
        <Field name="name" type="text" id="name" placeholder="Name"
          icon="user" component={ValidatedInput} validate={[required, maxLength20]} />
        <Label htmlFor="password">Password</Label>
        <Field name="password" type="password" id="password" placeholder="Password"
          icon="unlock" component={ValidatedInput} validate={[required, minLength5]} />
        <Label htmlFor="confirmPassword">Confirm<br/>password</Label>
        <Field name="confirmPassword" type="password" id="confirmPassword" placeholder="Password"
          icon="unlock" component={ValidatedInput} validate={[required, matchesPassword]} />
        <ButtonPrimary style={{gridColumn: '2/3'}} type="submit">Sign Up</ButtonPrimary>
      </SignGrid>
    </SignForm>
  );
};


export default reduxForm({ form: 'signUp' })(SignUp);
