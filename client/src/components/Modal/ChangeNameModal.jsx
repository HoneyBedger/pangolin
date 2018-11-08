import React from 'react';
import { connect } from 'react-redux';
import { changeName, hideModal } from '../../actions/actionCreators';
import { Modal, ModalHeader, ModalBody } from './Elements';
import ErrorMessage from '../ErrorMessage';
import LoadingSmall from '../LoadingSmall';
import { Label, Input, ButtonPrimary, SignGrid } from '../Form/Elements';

const mapStateToProps = (state) => {
  let user = state.user.user;
  return {
    token: user && user.token,
    error: state.user.nameErrMessage,
    isLoading: state.user.nameIsLoading,
    name: user && user.name
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeName: (name, token) => dispatch(changeName(name, token)),
  hideModal: () => dispatch(hideModal())
});

const UploadPictureModal = ({
  token,
  error,
  name,
  isLoading,
  changeName,
  hideModal
}) => {

  let nameInput;

  return (
    <Modal close={hideModal}>
      <ModalHeader close={hideModal}>Change name</ModalHeader>
      <ModalBody>
        <SignGrid>
        <Label>Current name:</Label>
        <p style={{color: '#fff'}}>{name}</p>
        <Label htmlFor="newName">New name</Label>
        <Input type="text" id="newName" placeholder="Name"
            ref={(input) => {nameInput = input}}
            disapled={isLoading} />
        <div/>
        <ButtonPrimary style={{gridColumn: '2/3'}} disabled={isLoading}
          onClick={() => {
            changeName(nameInput.value, token);
            nameInput.value = '';
          }}>Change</ButtonPrimary>
        </SignGrid>
        {isLoading && <LoadingSmall/>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ModalBody>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPictureModal);
