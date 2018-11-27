import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormHeader = styled.h2`
  text-align: center;
  color: #cc324b;
`;

const SignForm = styled.form`
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  padding: 6%;
  justify-self: center;
`;

const SignGrid = styled.div`
  display: grid;
  grid-template-columns: 30% minmax(50%, 70%);
  grid-row-gap: 40px;
`;

const InputGroup = styled.div`
  max-width: 100%;
  margin-right: 20px;
  flex: 2 2 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #9099b7;
  box-sizing: border-box;
`;

const Input = styled.input`
    background-color: transparent;
    margin: 0px 7px;
    width: 90%;
    border: none;
    border-bottom: solid 1px #9099b7;
    box-shadow: 0 8px 6px -6px #50597b;
    color: #fff;
    &:focus {
      border-bottom: solid 1px #fff;
      box-shadow: 0 8px 6px -6px #1f253d;
      outline: none;
    }
    ::placeholder {
      color: #9099b7;
    }
    ::-ms-input-placeholder {
      color: #9099b7;
    }
`;

const FormErrorMessage = styled.p`
  color: #ac2a3f;
  font-size: 0.8rem;
  margin: 0;
  padding: 3px 0 0 0;
  text-align: center;
`;

const ValidatedInput = ({ input, id, type, icon, placeholder, meta: { touched, error }}) => {
  return (
    <div>
      <InputGroup>
        <FontAwesomeIcon icon={icon} />
        <Input {...input} type={type} id={id} placeholder={placeholder} />
      </InputGroup>
      {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};

const SearchInput = styled(Input)`
  border-bottom: solid 1px #e64c65;
  box-shadow: none;
  margin-right: 0px;
  flex: 2 2 auto;
  &:focus {
    box-shadow: none;
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const Label = styled.label`
  grid-column: 1/2;
  text-align: right;
  margin-right: 1.5rem;
  color: #fff;
`;

const Button = styled.button`
  padding: 8px;
  color: #fff;
  box-sizing: border-box;
  min-width: 10px;
  flex: 0 0 auto;
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: pointer;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonPrimary = styled(Button)`
  border: none;
  background-color: #e64c65;
  &:hover {
    background-color: #cc324b;
  }
  &:active {
    background-color: #cc324b;
  }
  &:focus {
    background-color: #cc324b;
  }
  &[disabled] {
    background-color: #cc324b;
    color: rgb(120, 120, 120);
    cursor: not-allowed;
  }
`;

const ButtonOutline = styled(Button)`
  border: solid 1px #e64c65;
  background-color: transparent;
  &:hover {
    border: solid 1px #cc324b;
  }
  &:active {
    border: solid 1px #cc324b;
  }
  &:focus {
    border: solid 1px #cc324b;
  }
  &[disabled] {
    border: solid 1px #cc324b;
    color: rgb(120, 120, 120);
    cursor: not-allowed;
  }
`;

const ButtonInvisible = styled(Button)`
  display: inline;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  background-color: transparent;
  &:hover {
    color: #e64c65;
  }
  &:active {
    color: #e64c65;
  }
  &:focus {
    color: #e64c65;
  }
`;

export { SignForm, SignGrid, FormHeader, InputGroup, Input, ValidatedInput, SearchInput,
  FileInputWrapper, Label, Button, ButtonPrimary, ButtonOutline, ButtonInvisible };
