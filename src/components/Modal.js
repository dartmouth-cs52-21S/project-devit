// Copied from: https://github.com/dartmouth-cs52-21S/platform-client-sprioleau/blob/main/src/app/components/Modal.js
// This adds a modal wrapper that can display a modalContent prop

import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalVisibility } from '../store/actions';
import { selectModalContent, selectModalContentExists } from '../store/selectors';
import { useDismissOnOutsideClick } from '../hooks';

const Modal = () => {
  const dispatch = useDispatch();
  const modalContent = useSelector(selectModalContent);
  const modalContentExists = useSelector(selectModalContentExists);

  const modalWrapper = useRef(null);

  useDismissOnOutsideClick(modalWrapper, modalContent, () => dispatch(toggleModalVisibility({})));

  if (!modalContentExists) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content-positioner">
        <div ref={modalWrapper} className="modal-content-wrapper">
          {modalContent}
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Modal;

export const ModalMessage = ({ title, message, linkHref, linkText }) => (
  <div className="modal-message">
    <h2 className="modal-message__title">{title}</h2>
    <p className="modal-message__message">{message}</p>
    <a className="modal-message__text-link" target="_blank" href={linkHref} rel="noreferrer">{linkText}</a>
  </div>
);
