import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actionCreators from '../../actions/actionCreators';
import Logo from '../Logo';
import Column from './Column';
import ChatHeader from './Header';
import ChatBody from './ChatBody';
import AvailableChats from './AvailableChats';
import Contacts from './Contacts';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    contacts: state.contacts,
    chats: state.chats,
    searchContacts: state.searchContacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const ChatGrid = styled.section`
  height: 80vh;
  min-height: 300px;
  min-width: 350px;
  width: 96%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: minmax(350px, 54%) minmax(220px, 23%) minmax(220px, 23%);
  @media (max-width: 767px) {
          grid-template-columns: minmax(400px, 60%);
          grid-temple-rows: auto auto auto;
          grid-row-gap: 1rem;
          justify-content: center;
  }
`;

const Chat = ({ user, contacts, chats, searchContacts, logout, showModal,
  sendFirstMessage, sendMessage, resetUnseenMsgs, searchExistingChats,
  selectChat, searchExistingContacts, selectContact }) => {

  let allChats = chats.beforeSearch ? chats.beforeSearch : chats.chats;

  return (
    <div id='chat'>
      <Logo />
      <ChatGrid>
        <Column>
          <ChatHeader name={user.name} picture={user.picture} logout={logout}
            showModal={showModal} />
          <ChatBody chat={ chats.selectedChatId
              ? allChats.filter(chat => chat._id === chats.selectedChatId)[0]
              : allChats[0] }
            contacts={contacts.beforeSearch ? contacts.beforeSearch : contacts.contacts}
            user={user} sendFirstMessage={sendFirstMessage} sendMessage={sendMessage}
            showModal={showModal} resetUnseenMsgs={resetUnseenMsgs} />
        </Column>
        <AvailableChats chats={chats}
          contacts={contacts.beforeSearch ? contacts.beforeSearch : contacts.contacts}
          userId={user && user._id} token={user && user.token}
          searchExistingChats={searchExistingChats} selectChat={selectChat}
          resetUnseenMsgs={resetUnseenMsgs} />
        <Contacts contacts={contacts} showModal={showModal}
          searchContacts={searchContacts} searchExistingContacts={searchExistingContacts}
          selectContact={selectContact} />
      </ChatGrid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
