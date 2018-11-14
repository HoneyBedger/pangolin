import React from 'react';
import { connect } from 'react-redux';
import { searchContactsInModal, addPersonToChat, addPersonToChatLocally, hideModal } from '../../actions/actionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody } from './Elements';
import { InputGroup, SearchInput, ButtonPrimary, ButtonInvisible, ButtonOutline } from '../Form/Elements';
import { List, ListItem } from '../Chat/ListElements';
import ErrorMessage from '../ErrorMessage';
import LoadingSmall from '../LoadingSmall';
import ProfilePicture from '../Chat/ProfilePicture';


const mapStateToProps = (state) => ({
  contacts: state.contacts.contactsInModal,
  chat: state.chats.chats && state.chats.chats.filter(c => c._id === state.chats.selectedChatId)[0],
  token: state.user.user && state.user.user.token
});

const mapDispatchToProps = (dispatch) => ({
  searchContactsInModal: (searchString) => dispatch(searchContactsInModal(searchString)),
  addPersonToChat: (chatId, userId, token) => dispatch(addPersonToChat(chatId, userId, token)),
  addPersonToChatLocally: (chatId, userId) => dispatch(addPersonToChatLocally(chatId, userId)),
  hideModal: () => dispatch(hideModal())
});

const AddPersonModal = ({
  contacts,
  chat,
  token,
  searchContactsInModal,
  addPersonToChat,
  addPersonToChatLocally,
  hideModal
}) => {

  let searchInput;
  const search = () => {
    if (searchInput)
      searchContactsInModal(searchInput.value);
  };

  const close = () => {
    searchInput.value = '';
    searchContactsInModal('');
    hideModal();
  };

  contacts.sort((c1, c2) => {
    if (c1.name === c2.name) return 0;
    return c1.name > c2.name ? 1 : -1;
  });
  const filteredContacts = contacts.filter(c => {
    for (let id of chat.users) {
      if (id === c._id) return false;
    }
    return true;
  });

  return (
    <Modal close={close}>
      <ModalHeader close={close}>Add person to chat</ModalHeader>
      <ModalBody>
        <InputGroup style={{marginBottom: '20px'}}>
          <SearchInput placeholder='Search Contacts'
            ref={(input) => searchInput = input}
            onChange={search}/>
          <ButtonPrimary onClick={search}>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
      {contacts.length === 0
        ? <p style={{paddingLeft: '14px', paddingRight: '7px'}}>You do not have any contacts yet.</p>
        : <List style={{maxHeight: 'calc(80vh - 188px)'}}>
            {filteredContacts.map(contact => (
              <ListItem key={contact.username}>
                <div>
                  <ProfilePicture name={contact.name} online={contact.online}
                    picture={contact.picture && `data:${contact.picture.type};base64, ${contact.picture.data}`} />
                  {contact.name}
                </div>
                <ButtonOutline onClick={() => {
                    if (chat.messages.length === 0)
                      addPersonToChatLocally(chat._id, contact._id);
                    else
                      addPersonToChat(chat._id, contact._id, token);
                    }}>Add</ButtonOutline>
              </ListItem> ))}
          </List>
        }
      </ModalBody>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonModal);
