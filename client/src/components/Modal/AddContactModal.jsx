import React from 'react';
import { connect } from 'react-redux';
import { searchContacts, addContact, clearContactSearch, hideModal } from '../../actions/actionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody } from './Elements';
import { InputGroup, SearchInput, ButtonPrimary, ButtonInvisible, ButtonOutline } from '../Form/Elements';
import { List, ListItem } from '../Chat/ListElements';
import ErrorMessage from '../ErrorMessage';
import LoadingSmall from '../LoadingSmall';
import ProfilePicture from '../Chat/ProfilePicture';


const mapStateToProps = (state) => {
  let user = state.user.user;
  return {
    ...state.searchContacts,
    myUsername: user && user.username,
    token: user && user.token,
    existingContacts: state.contacts.contacts.map(c => c.username)
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchContacts: (searchString, token) => dispatch(searchContacts(searchString, token)),
  addContact: (contact, token) => dispatch(addContact(contact, token)),
  clearContactSearch: () => {dispatch(clearContactSearch())},
  hideModal: () => dispatch(hideModal())
});

const AddContactModal = ({ existingContacts, myUsername, token, contacts, errMessage,
  isLoading, searchContacts, addContact, clearContactSearch, hideModal }) => {

  let searchInput;

  const search = () => {
    if (searchInput.value && searchInput.value.length > 2)
      searchContacts(searchInput.value, token);
  };

  const close = () => {
    clearContactSearch();
    hideModal();
  };

  let searchResults = null;
  if (contacts) {
    if (contacts.length === 0)
      searchResults = <p>Sorry, couldn't find anything.</p>;
    else
      searchResults = (
        <List style={{maxHeight: 'calc(80vh - 188px)'}}>
          {contacts.filter(c => (!existingContacts.includes(c.username)
              && c.username !== myUsername))
            .map(c => (
              <ListItem key={c.username}>
                <div>
                  <ProfilePicture name={c.name} online={c.online}
                    picture={c.picture && `data:${c.picture.type};base64, ${c.picture.data}`} />
                  {c.name}<br/>{c.username}
                </div>
                <ButtonOutline onClick={() => addContact(c, token)}>Add</ButtonOutline>
              </ListItem>
            ))}
        </List>
      );
  }

  return (
    <Modal close={close}>
      <ModalHeader close={close}>Add contact</ModalHeader>
      <ModalBody>
        <InputGroup style={{marginBottom: '20px'}}>
          <SearchInput placeholder='Name or email'
            ref={(input) => searchInput = input}
            onChange={search}/>
          <ButtonPrimary onClick={search}>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
        {errMessage && <ErrorMessage>Error: {errMessage}</ErrorMessage>}
        {isLoading && <LoadingSmall />}
        {searchResults}
      </ModalBody>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContactModal);
