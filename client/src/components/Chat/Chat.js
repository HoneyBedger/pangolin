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
import { user } from '../../fakeData/user';
import { contacts } from '../../fakeData/contacts';
import { chats } from '../../fakeData/chats';

const mapStateToProps = (state) => {
  return {
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
    return (
      <div id='chat'>
        <Logo />
        <ChatGrid>
          <Column>
            <ChatHeader name={user.name} />
            <ChatBody chat={chats[1]} contacts={contacts} user={user}/>
          </Column>
          <AvailableChats chats={chats} contacts={contacts} myUsername={user.username} />
          <Contacts contacts={contacts} />
        </ChatGrid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);