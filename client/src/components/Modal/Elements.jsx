import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { ButtonInvisible } from '../Form/Elements';


const Show = keyframes`
  0% {
    display: none;
    opacity: 0;
  },
  1% {
    display: flex;
  }
  100% {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  overflow-y: auto;
  animation: ${Show} 0.7s ease;
`;

const ModalContainer = styled.div`
  max-height: 80%;
  max-width: 50%;
  min-height: 170px;
  @media (max-width: 768px) {
    max-width: 80%;
  }
  background-color: #50597b;
`;

const HeaderContainer = styled.h3`
  margin: 0;
  padding: 20px;
  color: #fff;
  background-color: rgb(204, 50, 75);
  font-weight: normal;
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled(ButtonInvisible)`
  :hover {
    color: #9099b7;
  }
  :active {
    color: #9099b7;
  }
`;

export const ModalHeader = ({ close, children }) => {
  return (
    <HeaderContainer>
      <div>{children}</div>
      <CloseButton onClick={close}>&#10005;</CloseButton>
    </HeaderContainer>
  );
};

export const ModalBody = styled.div`
  padding: 20px;
  margin: 1rem 0 1rem 0;
`;

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.outsideNode && e.target.isSameNode(this.outsideNode))
      this.props.close();
  }

  render() {
    return (
      <ModalOverlay ref={(node) => {this.outsideNode = node}}>
        <ModalContainer>
          {this.props.children}
        </ModalContainer>
      </ModalOverlay>
    );
  }
};
