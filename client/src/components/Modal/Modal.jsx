import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../actions/actionCreators';
import AddContactModal from './AddContactModal';
import ChangeNameModal from './ChangeNameModal';
import UploadPictureModal from './UploadPictureModal';

const mapStateToProps = (state) => state.modal;

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
  hideModal: () => dispatch(hideModal())
});



const modalTypes = {
  'ADD_CONTACT': AddContactModal,
  'CHANGE_NAME': ChangeNameModal,
  'UPLOAD_PICTURE': UploadPictureModal
};

export const Modal = ({ modalType, modalProps, hideModal }) => {
  if (!modalType)
    return null;
  else {
    const SpecificModal = modalTypes[modalType];
    return <SpecificModal {...modalProps} close={hideModal} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
