import React from 'react';
import styled from 'styled-components';
import ProfilePicture from './ProfilePicture';


const Message = ({ msg, fromContact, fromMe }) => {

  const MessageContainer = styled.div`
    float: ${fromMe ? 'left' : 'right'};
    clear: both;
    max-width: 60%;
  `;

  const MessageHeader = styled.div`
    display: flex;
    justify-content: ${fromMe ? 'flex-start' : 'flex-end'};
  `;

  const MessageHeaderItem = styled.p`
    lineHeight: '15px';
    padding: 0 7px 0 7px;
    margin: 0;
    text-align: ${fromMe ? 'left' : 'right'};
  `;

  const MessageContent = styled.div`
    background-color: ${fromMe ? 'rgba(255, 255, 255, 0.3)' : 'rgba(230, 76, 101, 0.5)'};
    color: #fff;
    margin: 0 0 15px 0;
    padding: 10px;
    border-radius: ${fromMe ? '0px 10px' : '10px 0px'} 10px 10px;
    max-width: 100%;
  `;

  const NameAndTime = (
    <div>
      <MessageHeaderItem>{fromContact.name}</MessageHeaderItem>
      <MessageHeaderItem>{msg.timestamp}</MessageHeaderItem>
    </div>
  );

  const Picture = <ProfilePicture picture={fromContact.picture} name={fromContact.name}
    showOnlineIndicator={false} size={'30px'}/>;

  return (
    <MessageContainer>
      <MessageHeader>
        {fromMe ? Picture : NameAndTime}
        {fromMe ? NameAndTime : Picture}
      </MessageHeader>
      <MessageContent>{msg.content}</MessageContent>
    </MessageContainer>
  );
};

export default Message;
