import React, { Component } from 'react';
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
import { fakeUser } from '../../fakeData/user';
import { contacts } from '../../fakeData/contacts';
import { chats } from '../../fakeData/chats';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    contacts: state.contacts.contacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const ChatGrid = styled.section`
  background: rgba(0, 0, 0, 0.3);
  height: 80vh;
  min-height: 300px;
  min-width: 288px;
  width: 96%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 54% 23% 23%;
  @media (max-width: 991px) {
    grid-template-columns: 70% 30%;
  }
  @media (max-width: 767px) {
    grid-template-columns: 100%;
  }
`;

class Chat extends Component {

  render() {
    console.log('in chat showModal', this.props.showModal);
    return (
      <div id='chat'>
        <Logo />
        <ChatGrid>
          <Column>
            <ChatHeader name={this.props.user.name} picture={this.props.user.picture}
              logout={this.props.logout} showModal={this.props.showModal}/>
            <ChatBody chat={chats[1]} contacts={contacts} user={fakeUser}/>
          </Column>
          <AvailableChats chats={chats} contacts={contacts} myUsername={fakeUser.username} />
          <Contacts contacts={this.props.contacts}
            showModal={this.props.showModal}
            searchContacts={this.props.searchContacts}
            searchExistingContacts={this.props.searchExistingContacts}/>
        </ChatGrid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
