import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonPrimary, ButtonInvisible } from '../Form/Elements';

const MessageInput = styled.textarea`
  box-sizing: border-box;
  height: 70px;
  width: 80%;
  @media (max-width: 991px) {
    width: 70%;
  }
  @media (max-width: 767px) {
    width: 60%;
  }
  float: left;
  background-color: rgba(255, 255, 255, 0.15);
  border: solid 1px #9099b7;
  color: #fff;
  padding: 10px;
  ::placeholder {
    color: #9099b7;
  }
  ::-ms-input-placeholder {
    color: #9099b7;
  }
`;


const CreateMessage = ({ send }) => {
  let messageInput;

  const handleKeyPress = (e) => {
    // send on Enter
    let keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode === 13 && messageInput.value && messageInput.value.trim() !== '') {
      send(messageInput.value);
      messageInput.value = '';
    }
  };

  return (
    <div style={{padding: '15px 7px 20px 27px'}}>
      <MessageInput rows='10' placeholder='Type here'
        ref={(input) => messageInput = input}
        onKeyPress={(e) => handleKeyPress(e)} />
      <div style={{float: 'left', marginLeft: '20px'}}>
        <ButtonPrimary onClick={() => {
            if (messageInput.value && messageInput.value.trim() !== '')
              send(messageInput.value);
            messageInput.value = '';
          }}>Send</ButtonPrimary>
      </div>
    </div>
  );
};

export default CreateMessage;
