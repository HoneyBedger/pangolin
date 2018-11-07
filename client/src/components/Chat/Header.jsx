import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderContainer from './HeaderContainer';
import { ButtonInvisible } from '../Form/Elements';

const ButtonInvisibleHideMedium = styled(ButtonInvisible)`
  @media (min-width: 992px) {
    display: none;
  }
`;

const ButtonInvisibleHideSmall = styled(ButtonInvisible)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const ChatHeader = ({ name, logout }) => {
  console.log('in header logout', logout);
  return (
    <HeaderContainer>
      <h3 style={{margin: '0 20px', fontWeight: 'normal'}}>{name}</h3>
      <div>
        <ButtonInvisibleHideSmall>
          <FontAwesomeIcon icon='comments' className='fa-lg'/>
        </ButtonInvisibleHideSmall>
        <ButtonInvisibleHideMedium>
          <FontAwesomeIcon icon='list-ul' className='fa-lg'/>
        </ButtonInvisibleHideMedium>
        <ButtonInvisible>
          <FontAwesomeIcon icon='cog' className='fa-lg'/>
        </ButtonInvisible>
        <ButtonInvisible onClick={logout}>
          <FontAwesomeIcon icon='sign-out-alt' className='fa-lg' /> Logout
        </ButtonInvisible>
      </div>
    </HeaderContainer>
  );
};

export default ChatHeader;
