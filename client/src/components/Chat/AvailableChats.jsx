import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Column from './Column';
import HeaderContainer from './HeaderContainer';
import ProfilePicture from './ProfilePicture';
import { InputGroup, SearchInput, ButtonPrimary } from '../Form/Elements';
import { List, ListItem } from './ListElements';

const ChatsColumn = styled(Column)`
  border-right: solid 1px #1f253d;
  @media (max-width: 767px) {
    display: none;
  }
`;

const AvailableChats = ({ chats, contacts, myUsername }) => {
  //sort chats by most recent message timestamp

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
      <List>
        {chats.map(chat => (
          <ListItem key={chat.users}>
            {chat.users.map(username => {
              if (username === myUsername) return null;
              let contact = contacts.filter(contact => contact.username === username)[0];
              return (
                <div key={contact.username}
                  style={{display: 'flex', alignItems: 'center', paddingRight: '20px'}}>
                  <ProfilePicture picture={contact.picture}
                    name={contact.name} online={contact.online}></ProfilePicture>
                  {contact.name}
                </div>
              );
            })}
          </ListItem>
        ))}
      </List>
    </ChatsColumn>
  );
};

export default AvailableChats;
