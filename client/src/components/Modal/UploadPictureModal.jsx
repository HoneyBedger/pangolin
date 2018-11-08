import React from 'react';
import { connect } from 'react-redux';
import { uploadPicture, uploadPictureWarning, hideModal } from '../../actions/actionCreators';
import { Modal, ModalHeader, ModalBody } from './Elements';
import ErrorMessage from '../ErrorMessage';
import Warning from '../Warning';
import LoadingSmall from '../LoadingSmall';
import ProfilePicture from '../Chat/ProfilePicture';
import { FileInputWrapper, ButtonPrimary, ButtonOutline } from '../Form/Elements';

const mapStateToProps = (state) => {
  let user = state.user.user;
  return {
    token: user && user.token,
    warning: state.user.pictureWarning,
    error: state.user.pictureErrMessage,
    isLoading: state.user.pictureIsLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadPicture: (picture, type, token) => dispatch(uploadPicture(picture, type, token)),
  uploadPictureWarning: (message) => dispatch(uploadPictureWarning(message)),
  hideModal: () => dispatch(hideModal())
});

const UploadPictureModal = ({
  token,
  warning,
  error,
  isLoading,
  uploadPicture,
  uploadPictureWarning,
  hideModal
}) => {

  const close = () => {
    hideModal();
  };

  let fileInput;

  const checkIfValid = () => {
    console.log('selected file:', fileInput.files[0]);
    if (!fileInput || !fileInput.files[0]) {
      uploadPictureWarning('Please select a file.');
      return false;
    }
    let extension = fileInput.value.match(/\.([^\.]+)$/)[1];
    let allowedExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
    if (!allowedExtensions.includes(extension)) {
      uploadPictureWarning('Please select a jpg or png file.');
      return false;
    }
    if (fileInput.files[0].size > 10*Math.pow(1024, 2)) {
      uploadPictureWarning('File size should be < 10Mb.');
      return false;
    }
    uploadPictureWarning(fileInput.files[0].name);
    return true;
  };

  return (
    <Modal close={close}>
      <ModalHeader close={close}>Upload picture</ModalHeader>
      <ModalBody>
        <div style={{display: 'flex', width: '300px',
          justifyContent: 'space-between', alignItems: 'baseline'}}>
          <FileInputWrapper>
            <ButtonOutline disabled={isLoading}>Choose a file</ButtonOutline>
            <input type='file'
              accept='.jpg,.jpeg,.png,image/jpeg,image/png'
              ref={(input) => fileInput = input}
              onChange={checkIfValid} disabled={isLoading}/>
            {warning && <Warning>{warning}</Warning>}
          </FileInputWrapper>
          <ButtonPrimary disabled={isLoading} onClick={() => {
            if (checkIfValid()) uploadPicture(fileInput.files[0], fileInput.files[0].type, token);
          }}>Upload</ButtonPrimary>
        </div>
        {isLoading && <LoadingSmall/>}
      </ModalBody>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPictureModal);
