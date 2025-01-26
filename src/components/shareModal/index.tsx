import { Modal } from "antd";
import React, { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import styled from "styled-components";

interface Iprops {
  visible: boolean;
  onCancel: () => void;
  url: string;
  title: string;
}

export const SocialMediaShare: FC<Iprops> = ({
  visible,
  onCancel,
  url,
  title,
}) => {
  return (
    <StyledModal
      onCancel={onCancel}
      open={visible}
      style={{ display: "flex", gap: "20px" }}
      footer={[]}
      title="Invite Friends"
      centered>
      <SocialBody className="share-modal">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <XIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </SocialBody>
    </StyledModal>
  );
};

const SocialBody = styled.div`
  display: flex;
  gap: 10px;
`;

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
