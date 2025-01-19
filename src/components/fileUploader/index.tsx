'use client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
  CancelIcon,
  DeleteIcon,
  EyeCloseIcon,
  EyeIcon,
  ImageIcon,
  ImageUploadIcon,
} from '@/assets';
// import { uploadImage } from '@/utils/uploadImage';
import Image from 'next/image';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { css, styled } from 'styled-components';
import { ButtonLoader } from './buttonLoader';

const media = {
  tablet: (...args: any[]) => css`
    @media (max-width: 768px) {
      ${css(args as any)};
    }
  `,
  mobile: (...args: any[]) => css`
    @media (max-width: 480px) {
      ${css(args as any)};
    }
  `,
};

interface FileUploadProps {
  onSuccess: (url: string) => void;
  onEditImageUrl?: string;
  altText?: string;
  imageLink?: boolean;
  imageHyperlinkUrl?: string;
  onAltTextChange?: (text: string) => void;
  onImageLinkChange?: (text: string) => void;
  imgDimension?: string;
}
export const FileUploader: FC<FileUploadProps> = ({
  onEditImageUrl,
  altText,
  imageLink,
  onAltTextChange,
  onImageLinkChange,
  imageHyperlinkUrl,
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess,
  imgDimension,
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState(onEditImageUrl);
  const [hideImage, setHideImage] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    setImageUrl(onEditImageUrl);
  }, [onEditImageUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 5 * 1024 * 1024) {
        toast.error('Maximum of 5mb file allowed');
      } else {
        handlePicture(acceptedFiles[0]);
        setImageName(acceptedFiles[0].name);
      }
    },
    [imageName]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePicture = async (file: File) => {
    setUploading(true);
    // uploadImage(file)
    //   .then((url) => {
    //     setImageUrl(url);
    //     onSuccess(url.split('?')[0]);
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });
  };

  const handleRemoveImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setImageUrl('');
    setImageName('');
    onAltTextChange?.('');
    onImageLinkChange?.('');
  };

  const handleView = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setViewImage(true);
  };

  return (
    <>
      {viewImage && (
        <ImageViewer>
          <FullImageCard>
            <FullImage
              src={imageUrl || onEditImageUrl || ''}
              width={590}
              height={400}
              style={{ objectFit: 'contain' }}
              alt=""
            />
            <CloseButton onClick={() => setViewImage(false)}>
              <CancelIcon />
            </CloseButton>
            <ImageTitle>{imageName}</ImageTitle>
            <AlternativeText>{altText}</AlternativeText>
          </FullImageCard>
        </ImageViewer>
      )}
      <ImageWrap>
        <MediaWrap
          $isImageAdded={imageUrl !== ''}
          $disabled={uploading}
          {...getRootProps()}
        >
          <ImageUploadIcon />
          <MediaText>
            <input {...getInputProps()} />
             <span>Select Image</span> 
          </MediaText>
          <MediaText2>
            {imgDimension}
          </MediaText2>
          {uploading && <ButtonLoader />}
        </MediaWrap>

        {!uploading && imageUrl && (
          <ImageWrapper>
            <ImageContainer $isHidden={hideImage} image={imageUrl}>
              <DeleteIconWrap onClick={(e) => handleRemoveImage(e)}>
                <DeleteIcon />
              </DeleteIconWrap>
            </ImageContainer>
            <ImageDetailWrapper>
              <ImageTitle>{imageName}</ImageTitle>
              <AlternativeText>
                {altText === ''
                  ? 'Alt text describing Image for visual accessibility...'
                  : altText}
              </AlternativeText>
              <ImageButtonWrap>
                <ImageButtons type="button" onClick={handleView}>
                  <ImageIcon /> View
                </ImageButtons>
                <ImageButtons
                  type="button"
                  onClick={() => setHideImage(!hideImage)}
                >
                  {!hideImage ? (
                    <>
                      <EyeCloseIcon />
                      Hide
                    </>
                  ) : (
                    <>
                      <EyeIcon />
                      Unhide
                    </>
                  )}
                </ImageButtons>
              </ImageButtonWrap>
            </ImageDetailWrapper>
          </ImageWrapper>
        )}
      </ImageWrap>
      <InputFlexbox>
        {imageLink && (
          <InputWrapper>
            <Label>Image link</Label>
            <Input
              placeholder="Enter image link"
              value={imageHyperlinkUrl}
              onChange={(e) => onImageLinkChange?.(e.target.value)}
            />
          </InputWrapper>
        )}
        <InputWrapper>
          <Label>Alt text</Label>
          <Input
            placeholder="Enter image description"
            value={altText}
            onChange={(e) => onAltTextChange?.(e.target.value)}
          />
        </InputWrapper>
      </InputFlexbox>
    </>
  );
};


const MediaText = styled.p`
  color: ${({ theme }) => theme.colors.neutral[700]};
  display: flex;
  column-gap: 5px;
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
  span {
    color: ${({ theme }) => theme.colors.background.green};
    text-decoration: underline;
    cursor: pointer;
  }
`;
const MediaText2 = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_SMALL })};
`;


const DeleteIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  z-index: 5;
  background: ${({ theme }) => theme.colors.red[20]};
  svg {
    width: 20px;
    height: 20px;
  }
`;
const ImageDetailWrapper = styled.div``;
const ImageTitle = styled.p`
  text-align: left;
  color: ${({ theme }) => theme.colors.neutral[800]};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
`;
const AlternativeText = styled.p`
  text-align: left;
  margin: 5px 0px 15px 0px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_SMALL })};
`;
const ImageButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[300]};
`;
const ImageButtons = styled.button`
  width: 148px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  cursor: pointer;
  border-radius: 40px;
  color: ${({ theme }) => theme.colors.neutral[500]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.Medium, variant: variants.BODY_SMALL })};
  svg {
    width: 15px;
    height: 15px;
    stroke: ${({ theme }) => theme.colors.neutral[500]};
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  margin: 10px 0px;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.neutral[800]};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
`;
const Input = styled.input`
  height: 48px;
  width: 100%;
  margin-top: 10px;
  padding: 0px 15px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  background: ${({ theme }) => theme.colors.gray[50]};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`;
// const InputFlexbox = styled.div`
//   display: flex;
//   align-items: center;
//   column-gap: 10px;
// `;

const ImageViewer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(1, 1, 1, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;



const CloseButton = styled.button`
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  position: absolute;
  z-index: 1;
  right: 32px;
  top: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


const ImageWrap = styled.div`
  position: relative;
  margin-top: 8px;

  ${media.tablet`
    margin-top: 16px;
  `}
`;

const MediaWrap = styled.div<{ $isImageAdded?: boolean; $disabled: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-bottom: ${({ $isImageAdded }) => ($isImageAdded ? '90px' : '20px')};
  height: ${({ $isImageAdded }) => ($isImageAdded ? '308px' : '272px')};
  background: ${({ theme }) => theme.colors.gray[30]};
  border: 1px dashed ${({ theme }) => theme.colors.neutral[300]};
  position: relative;

  ${media.tablet`
    height: ${({ $isImageAdded } : {$isImageAdded : boolean}) => ($isImageAdded ? '250px' : '200px')};
    margin-bottom: 40px;
  `}

  ${media.mobile`
    height: ${({ $isImageAdded } : {$isImageAdded : boolean}) => ($isImageAdded ? '200px' : '180px')};
  `}
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  column-gap: 20px;
  width: 100%; /* Make it flexible */
  max-width: 472px;
  height: 140px;
  position: absolute;
  bottom: -70px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};

  ${media.tablet`
    flex-direction: column;
    height: auto;
    bottom: -50px;
    column-gap: 10px;
    padding: 16px;
  `}

  ${media.mobile`
    padding: 8px;
  `}
`;

const ImageContainer = styled.div<{
  $isHidden: boolean;
  image: string;
}>`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  overflow: hidden;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;

  ${({ $isHidden, image }) =>
    $isHidden &&
    `
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.7) 100%
        ),
        url(${image}),
        lightgray 50% / cover no-repeat;
    `};

  ${media.tablet`
    width: 96px;
    height: 96px;
  `}

  ${media.mobile`
    width: 80px;
    height: 80px;
  `}
`;

const InputFlexbox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  ${media.tablet`
    flex-direction: column;
    column-gap: 0;
    row-gap: 10px;
  `}
`;

const FullImageCard = styled.div`
  width: 90%; /* Use a percentage for responsiveness */
  max-width: 625px;
  height: auto;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.light};
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;

  ${media.mobile`
    width: 100%;
    padding: 8px;
  `}
`;

const FullImage = styled(Image)`
  max-height: 300px; /* Adjust to fit */
  max-width: 100%; /* Keep it responsive */
  border-radius: 8px;
  margin-bottom: 20px;

  ${media.mobile`
    max-height: 200px;
  `}
`;
