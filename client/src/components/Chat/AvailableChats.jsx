import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Column from './Column';
import HeaderContainer from './HeaderContainer';
import ProfilePicture from './ProfilePicture';
import { InputGroup, SearchInput, ButtonPrimary } from '../Form/Elements';
import { List, ListItem, MessageBadge } from './ListElements';
import ErrorMessage from '../ErrorMessage';

const AvailableChats = ({ chats, contacts, userId, token, selectChat,
  resetUnseenMsgs, searchExistingChats }) => {

  let searchInput;
  const search = () => {
    if (searchInput)
      searchExistingChats(searchInput.value, contacts);
  };

  //sort chats by most recent message timestamp
  chats.chats.sort((chat1, chat2) => {
    //console.log('chat1, chat2', chat1, chat2);
    let lastMsgTime1 = chat1.messages.length > 0 && new Date(chat1.messages[chat1.messages.length - 1].updatedAt);
    let lastMsgTime2 = chat2.messages.length > 0 && new Date(chat2.messages[chat2.messages.length - 1].updatedAt);
    if (lastMsgTime1 && lastMsgTime1) return lastMsgTime2 - lastMsgTime1;
    else if (lastMsgTime1) return -1;
    else if (lastMsgTime2) return 1;
    else return 0;
  });
  if (!chats.selectedChatId && chats.chats[0]) selectChat(chats.chats[0]._id);


  let ChatList;
  if (!userId || !contacts || !chats.chats)
    ChatList = (
      <ErrorMessage style={{padding: '20px 7px 20px 14px', textAlign: 'left'}}>
        Sorry, something is wrong with your chats.</ErrorMessage>
    );
  else if (chats.chats.length === 0)
    ChatList = <p style={{padding: '20px 7px 20px 14px', textAlign: 'left'}}>No chats.</p>
  else
    ChatList = (
      <List>
        {chats.chats.map(chat => {
          let numNewMsgs = chat.numUnseenMsgs ? chat.numUnseenMsgs : 0;
          return (
                <ListItem key={chat._id}
                  selected={chat._id === chats.selectedChatId}
                  onClick={() => {
                    selectChat(chat._id);
                    resetUnseenMsgs(chat._id, token);
                  }} >
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
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
                  </div>
                  {(numNewMsgs > 0) && <MessageBadge>{numNewMsgs}</MessageBadge>}
                </ListItem>
              );
            })}
          </List>
        );

  return (
    <Column id="availableChats">
      <HeaderContainer style={{background: 'rgba(57, 66, 100, 0.5)'}}>
        <InputGroup>
          <SearchInput placeholder='Search Chats'
            ref={(input) => searchInput = input}
            onChange={search} />
          <ButtonPrimary onClick={search}>
            <FontAwesomeIcon icon='search' />
          </ButtonPrimary>
        </InputGroup>
      </HeaderContainer>
      {ChatList}
    </Column>
  );

};

export default AvailableChats;
