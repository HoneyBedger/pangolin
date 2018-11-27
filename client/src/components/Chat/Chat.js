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
//import { fakeUser } from '../../fakeData/user';
//import { contacts } from '../../fakeData/contacts';
//import { chats } from '../../fakeData/chats';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    contacts: state.contacts,
    chats: state.chats,
    searchContacts: state.searchContacts,
    smallDeviceDisplay: state.smallDeviceDisplay
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const ChatGrid = styled.section`
  height: 80vh;
  min-height: 300px;
  min-width: 370px;
  width: 96%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: minmax(335px, 54%) minmax(220px, 23%) minmax(220px, 23%);

`;

class Chat extends Component {

  render() {
    console.log('in chat showModal', this.props.showModal);
    let allChats = this.props.chats.beforeSearch ?
      this.props.chats.beforeSearch : this.props.chats.chats;

    return (
      <div id='chat'>
        <Logo />
        <ChatGrid>
          <Column>
            <ChatHeader name={this.props.user.name} picture={this.props.user.picture}
              logout={this.props.logout} showModal={this.props.showModal}/>
            <ChatBody chat={ this.props.chats.selectedChatId
                ? allChats.filter(chat => chat._id === this.props.chats.selectedChatId)[0]
                : allChats[0] }
              contacts={this.props.contacts.beforeSearch ? this.props.contacts.beforeSearch : this.props.contacts.contacts}
              user={this.props.user}
              sendFirstMessage={this.props.sendFirstMessage}
              sendMessage={this.props.sendMessage}
              showModal={this.props.showModal}
              resetUnseenMsgs={this.props.resetUnseenMsgs} />
          </Column>
          <AvailableChats chats={this.props.chats}
            contacts={this.props.contacts.beforeSearch ? this.props.contacts.beforeSearch : this.props.contacts.contacts}
            userId={this.props.user && this.props.user._id}
            token={this.props.user && this.props.user.token}
            searchExistingChats={this.props.searchExistingChats}
            selectChat={this.props.selectChat}
            resetUnseenMsgs={this.props.resetUnseenMsgs}
            smallDeviceDisplay={this.props.smallDeviceDisplay}/>
          <Contacts contacts={this.props.contacts}
            showModal={this.props.showModal}
            searchContacts={this.props.searchContacts}
            searchExistingContacts={this.props.searchExistingContacts}
            selectContact={this.props.selectContact} />
        </ChatGrid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
