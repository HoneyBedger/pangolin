import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePicture from './ProfilePicture';
import Message from './Message';
import CreateMessage from './CreateMessage';
import { ButtonInvisible } from '../Form/Elements';

const ChatBodyContainer = styled.div`
  background: rgba(80, 89, 123, 0.5);
  display: grid;
  grid-template-rows: 39px calc(100% - 39px - 100px) 100px;
`;

const ChatBodyHeader = styled.div`
  padding: 0px 7px 0px 27px;
  line-height: 39px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const HeaderH3 = styled.h3`
  margin: 0;
  font-weight: normal;
  color: #e64c65;
  max-width: 50%;
  height: 39px;
  overflow: hidden;
`;

const MessageHistory = styled.div`
  max-height: 100%;
  padding: 10px 7px 10px 27px;
  display: block;
  overflow: auto;
  ::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0px;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #9099b7;
    border-radius: 4px;
  }
`;

const ChatBody = ({ chat, contacts, user, sendFirstMessage, sendMessage, showModal }) => {

  if (!chat) return <p style={{padding: '20px 7px 20px 27px'}}>Select a person and start messaging!</p>

  const send = (content) => {
    if (chat.messages.length == 0) sendFirstMessage(chat._id, chat.users, content, user.token);
    else sendMessage(chat._id, content, user.token);
  };

  console.log('in Chat Body chat, contacts', chat, contacts);
  const participants = chat.users.filter(id => id !== user._id)
  .map(id => {
    let contact = contacts.filter(contact => contact._id === id)[0];
    return contact.name;
  }).join(', ');

  chat.messages.sort((m1, m2) => new Date(m1.updatedAt) - new Date(m2.updatedAt));
  console.log('in ChatBody messages:', chat.messages.map(msg => {
    return { ...msg, updatedAt: new Date(msg.updatedAt)};
  }));
  //TODO: set initial scrolling position to end

  return (
    <ChatBodyContainer>
      <ChatBodyHeader>
        <HeaderH3>{participants}</HeaderH3>
        <ButtonInvisible style={{lineHeight: '39px'}}
          onClick={() => showModal('ADD_PERSON')}>
          <FontAwesomeIcon icon='plus'/> Add person
        </ButtonInvisible>
      </ChatBodyHeader>
      <MessageHistory>
        {chat.messages.map((msg, i) => {
          let fromContact = (msg.from === user._id)
            ? user
            : contacts.filter(contact => contact._id === msg.from)[0];
          return <Message key={i} msg={msg}
            fromContact={fromContact} fromMe={msg.from === user._id}/>;
        })}
      </MessageHistory>
      <CreateMessage send={send} />
    </ChatBodyContainer>
  );
};

export default ChatBody;
