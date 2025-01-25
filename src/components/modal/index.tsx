import React from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  @media (max-width: 768px) {
    width: 90% !important;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 70% !important;
  }
  @media (min-width: 1025px) {
    width: 50% !important;
  }
`;

const ModalContent = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

interface CustomModalProps {
  visible: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onAction: () => void;
  actionText?: string;
  closeText?: string;
  loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  children,
  onClose,
  onAction,
  actionText = 'Confirm',
  closeText = 'Cancel',
  loading = false,
  ...props
}) => {
  return (
    <StyledModal
      title={title}
      visible={visible}
      onCancel={onClose}
      centered
      footer={[
        <Button key="close" onClick={onClose}>
          {closeText}
        </Button>,
        <Button loading={loading} key="action" type="primary" onClick={onAction}>
          {actionText}
        </Button>,
      ]}
      {...props}
    >
      <ModalContent>{children}</ModalContent>
    </StyledModal>
  );
};

export default CustomModal;
