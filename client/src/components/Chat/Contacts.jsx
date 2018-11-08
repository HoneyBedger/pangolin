import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Column from './Column';
import HeaderContainer from './HeaderContainer';
import ProfilePicture from './ProfilePicture';
import { InputGroup, SearchInput, ButtonPrimary,
  ButtonInvisible } from '../Form/Elements';
import { List, ListItem, Badge } from './ListElements';

const ContactsColumn = styled(Column)`
  @media (max-width: 991px) {
    display: none;
  }
`;

const Contacts = ({ contacts, showModal, searchContacts, searchExistingContacts }) => {
  contacts.sort((c1, c2) => {
    if (c1.name === c2.name) return 0;
    return c1.name > c2.name ? 1 : -1;
  });

  let searchInput;
  const search = () => {
    if (searchInput)
      searchExistingContacts(searchInput.value);
  };

  return (
    <ContactsColumn>
      <HeaderContainer>
        <InputGroup>
          <SearchInput placeholder='Search Contacts'
            ref={(input) => searchInput = input}
            onChange={search}/>
          <ButtonPrimary onClick={search}>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
        <ButtonInvisible style={{flex: '1 0 auto'}}
          onClick={() => showModal('ADD_CONTACT')}>
          <FontAwesomeIcon icon='plus'/> Add
        </ButtonInvisible>
      </HeaderContainer>
      {contacts.length === 0
        ? <p style={{paddingLeft: '14px', paddingRight: '7px'}}>You do not have any contacts yet.</p>
        : <List>
            {contacts.map(contact => (
              <ListItem key={contact.username}>
                <div>
                  <ProfilePicture name={contact.name} online={contact.online}
                    picture={contact.picture && `data:${contact.picture.type};base64, ${contact.picture.data}`} />
                  {contact.name}
                </div>
                {contact.new && <Badge>new</Badge>}
              </ListItem> ))}
          </List>
        }
    </ContactsColumn>
  );
};

export default Contacts;
