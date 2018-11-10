import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Column from './Column';
import HeaderContainer from './HeaderContainer';
import ProfilePicture from './ProfilePicture';
import { InputGroup, SearchInput, ButtonPrimary } from '../Form/Elements';
import { List, ListItem } from './ListElements';
import ErrorMessage from '../ErrorMessage';

const ChatsColumn = styled(Column)`
  border-right: solid 1px #1f253d;
  @media (max-width: 767px) {
    display: none;
  }
`;

const AvailableChats = ({ chats, contacts, userId }) => {
  //sort chats by most recent message timestamp
  console.log('In AvailableChats chats, contacts, userId', chats, contacts, userId);

  let ChatList;
  if (!userId || !contacts || !chats)
    ChatList = <ErrorMessage style={{padding: '20px 7px 20px 14px', textAlign: 'left'}}>Sorry, something is wrong with your chats.</ErrorMessage>
  else if (chats.length === 0)
    ChatList = <p style={{padding: '20px 7px 20px 14px', textAlign: 'left'}}>You do not have any chats yet.</p>
  else
    ChatList = (
      <List>
        {chats.map(chat => (
          <ListItem key={chat._id}>
            {chat.users.map(id => {
              if (id === userId) return null;
              let contact = contacts.filter(contact => contact._id === id)[0];
              return (
                <div key={contact._id}
                  style={{display: 'flex', alignItems: 'center', paddingRight: '20px'}}>
                  <ProfilePicture picture={contact.picture && `data:${contact.picture.type};base64, ${contact.picture.data}`}
                    name={contact.name} online={contact.online}></ProfilePicture>
                  {contact.name}
                </div>
              );
            })}
          </ListItem>
        ))}
      </List>
    );

  return (
    <ChatsColumn>
      <HeaderContainer style={{background: 'rgba(57, 66, 100, 0.5)'}}>
        <InputGroup>
          <SearchInput placeholder='Search Chats'/>
          <ButtonPrimary>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
      </HeaderContainer>
      {ChatList}
    </ChatsColumn>
  );
};

export default AvailableChats;
