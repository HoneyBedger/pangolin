import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Column from './Column';
import HeaderContainer from './HeaderContainer';
import ProfilePicture from './ProfilePicture';
import { InputGroup, SearchInput, ButtonPrimary,
  ButtonInvisible } from '../Form/Elements';
import { List, ListItem } from './ListElements';

const ContactsColumn = styled(Column)`
  @media (max-width: 991px) {
    display: none;
  }
`;

const Contacts = ({ contacts }) => {
  contacts.sort((c1, c2) => {
    if (c1.name === c2.name) return 0;
    return c1.name > c2.name ? 1 : -1;
  });

  return (
    <ContactsColumn>
      <HeaderContainer>
        <InputGroup>
          <SearchInput placeholder='Search Contacts'/>
          <ButtonPrimary>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
        <ButtonInvisible style={{flex: '1 0 auto'}}>
          <FontAwesomeIcon icon='plus'/> Add
        </ButtonInvisible>
      </HeaderContainer>
      <List >
        {contacts.map(contact => (
          <ListItem key={contact.username}>
            <ProfilePicture picture={contact.picture}
              name={contact.name} online={contact.online}></ProfilePicture>
            {contact.name}
          </ListItem>
        ))}
      </List>
    </ContactsColumn>
  );
};

export default Contacts;