import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfilePicture = ({ picture, name, online,
    showOnlineIndicator = true, size = '50px' }) => {
      
  const OnlineIndicator = styled.div`
    height: ${size};
    width: 7px;
    background: ${online ? '#32cc8d' : '#cc324b'};
    border: solid 1px ${online ? '#2aac77' : '#ac2a3f'};
    margin-right: 5px;
  `;

  const PictureDiv = styled.div`
    width: ${size};
    height: ${size};
    background-color: #50597b;
    border: solid 1px #414863;
    text-align: center;
    line-height: ${size};
  `;

  return (
    <React.Fragment>
      <PictureDiv>
        {picture
          ? <img src={picture} style={{width: size, height: size}} alt={name} />
        : <FontAwesomeIcon icon='user-circle' className='fa-lg'/>
        }
      </PictureDiv>
      {showOnlineIndicator ? <OnlineIndicator/> : null}
    </React.Fragment>
  );
};

export default ProfilePicture;
