import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SignForm, SignGrid, ValidatedInput,  Label, ButtonPrimary } from './Form/Elements';
import ErrorMessage from './ErrorMessage';


// Validators
const required = value => value && value.trim().length > 0 ? undefined : 'Required';
const minLength5 = value => !value || value.trim().length < 5 ? 'Must be at least 5 characters' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim()) ?
  'Invalid email address' : undefined;


const SignIn = ({ handleSubmit, errMessage, pristine, reset, submitting }) => {

  return (
    <SignForm onSubmit={handleSubmit}>
      {errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
      <SignGrid>
        <Label htmlFor="signinEmail">Email</Label>
        <Field name="signinEmail" type="email" id="signinEmail" placeholder="Email"
          icon="envelope" component={ValidatedInput} validate={[required, email]} />
        <Label htmlFor="signinPassword">Password</Label>
        <Field name="signinPassword" type="password" id="signinPassword"
          placeholder="Password" icon="unlock" component={ValidatedInput}
          validate={[required, minLength5]} />
        <ButtonPrimary type="submit" style={{gridColumn: '2/3'}}
          disabled={submitting}>Sign In</ButtonPrimary>
      </SignGrid>
    </SignForm>
  );
};


export default reduxForm({ form: 'signIn' })(SignIn);
