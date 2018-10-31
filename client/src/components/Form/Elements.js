import styled from 'styled-components';

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
  display: flex;
  flex-direction: row;
  align-items: baseline;
  color: #9099b7;
`;

const Input = styled.input`
      background-color: rgba(255, 255, 255, 0);
      margin: 0px 7px;
      max-width: 90%;
      border: none;
      border-bottom: solid 1px #9099b7;
      box-shadow: 0 8px 6px -6px #50597b;
      color: #fff;
      :focus {
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

const Label = styled.label`
  grid-column: 1/2;
  text-align: right;
  margin-right: 1.5rem;
  color: #fff;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #e64c65;
  color: #fff;
  border: none;
  :hover {
    background-color: #cc324b;
    cursor: pointer;
  }
  :active {
    background-color: #cc324b;
    cursor: pointer;
    outline: none;
  }
  :focus {
    outline: none;
  }
`;

export { SignForm, SignGrid, FormHeader, InputGroup, Input,
  Label, Button};
