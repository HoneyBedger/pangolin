import styled from 'styled-components';

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  height: 100%;
  overflow: auto;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
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

export { List, ListItem };
