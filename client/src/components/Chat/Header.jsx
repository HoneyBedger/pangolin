import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderContainer from './HeaderContainer';
import { ButtonInvisible } from '../Form/Elements';
import { Dropdown, DropdownMenu, DropdownItem } from './DropdownElements';

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

const ChatHeader = ({ name, picture, logout, showModal }) => {
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
        <Dropdown>
          <ButtonInvisible>
            <FontAwesomeIcon icon='cog' className='fa-lg'/>
          </ButtonInvisible>
          <DropdownMenu>
            <DropdownItem onClick={() => showModal('CHANGE_NAME')}>
              Change name
            </DropdownItem>
            <DropdownItem onClick={() => showModal('UPLOAD_PICTURE')}>
              Upload profile picture
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ButtonInvisible onClick={logout}>
          <FontAwesomeIcon icon='sign-out-alt' className='fa-lg' /> Logout
        </ButtonInvisible>
      </div>
    </HeaderContainer>
  );
};

export default ChatHeader;
