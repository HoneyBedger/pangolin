import React, { Component } from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  :hover ul {
    display: block;
  }
`;

const DropdownItem = styled.li`
  display: block;
  margin: 0;
  padding: 10px;
  background-color: #24293d;
  white-space: nowrap;
  cursor: pointer;
  :hover {
    color: #e64c65;
  }
  :active {
    color: #e64c65;
  }
  :focus {
    color: #e64c65;
  }
`;


const DropdownMenu = ({ isOpen, children }) => {
  const MenuList = styled.ul`
    position: absolute;
    z-index: 10;
    display: ${isOpen ? 'block' : 'none'};
    min-width: 150px;
    margin: 0;
    padding: 0;
  `;

  return (
    <MenuList>
      <div style={{height: '5px'}}/>
      {children}
    </MenuList>
  );
};

export { Dropdown, DropdownMenu, DropdownItem };
