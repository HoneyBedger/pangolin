import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  height: 100%;
  overflow: auto;
`;

const ListItem = ({ selected, children, onClick }) => {
  const ListItem = styled.li`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      >div {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      flex-wrap: wrap;
      padding-right: 10px;
      background-color: ${selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
      color: ${selected ? '#fff' : 'inherit'};
      border-bottom: solid 1px #9099b7;
      :hover {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        img {
          -webkit-filter: contrast(140%);
        }
      }
    `;
    return <ListItem onClick={onClick}>{children}</ListItem>;
};


const Badge = styled.p`
  justify-self: end;
  background-color: #11a8ab;
  border-radius: 10px;
  color: #fff;
  padding: 4px;
`;

const MessageBadge = styled(Badge)`
  background-color: #cc324b;
`;

export { List, ListItem, Badge, MessageBadge };
