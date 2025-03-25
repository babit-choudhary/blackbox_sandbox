import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showClose = true,
  closeOnClickOutside = true,
  footer = null 
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (event) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'lg':
        return 'max-w-4xl';
      case 'xl':
        return 'max-w-6xl';
      case 'full':
        return 'max-w-full m-4';
      default:
        return 'max-w-2xl';
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClickOutside}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          ref={modalRef}
          className={`${getSizeClass()} w-full bg-white rounded-lg shadow-xl transform transition-all`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
              {title}
            </h3>
            {showClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Confirmation Modal
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'fas fa-exclamation-triangle text-red-600',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
      case 'warning':
        return {
          icon: 'fas fa-exclamation-circle text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        };
      case 'info':
        return {
          icon: 'fas fa-info-circle text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        };
      case 'success':
        return {
          icon: 'fas fa-check-circle text-green-600',
          button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        };
      default:
        return {
          icon: 'fas fa-question-circle text-gray-600',
          button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <i className={`text-2xl ${styles.icon}`}></i>
        </div>
        <div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </Modal>
  );
};

// Form Modal
export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  size = 'md',
  isSubmitting = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      closeOnClickOutside={false}
      footer={
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            {cancelText}
          </button>
          <button
            type="submit"
            form="modal-form"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      }
    >
      <form id="modal-form" onSubmit={onSubmit}>
        {children}
      </form>
    </Modal>
  );
};

// Example usage:
/*
import { Modal, ConfirmationModal, FormModal } from './components/Modal';

// Basic Modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <div>Modal content goes here</div>
</Modal>

// Confirmation Modal
<ConfirmationModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  type="danger"
/>

// Form Modal
<FormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleSubmit}
  title="Add New Item"
  isSubmitting={isSubmitting}
>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" className="mt-1 input-field" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Description</label>
      <textarea className="mt-1 input-field" rows="3"></textarea>
    </div>
  </div>
</FormModal>
*/

export default Modal;