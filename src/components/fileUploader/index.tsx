"use client";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ImageUploadIcon } from "@/assets";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { css, styled } from "styled-components";
import { FileView } from "@/utils/file-view";

interface FileDetails {
  file: File;
  date: string;
}

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
  onSuccess: (url: File) => void;
  onEditImageUrl?: string;
  altText?: string;
  imageLink?: boolean;
  imageHyperlinkUrl?: string;
  onAltTextChange?: (text: string) => void;
  onImageLinkChange?: (text: string) => void;
  imgDimension?: string;
  date?: string;
}
export const FileUploader: FC<FileUploadProps> = ({
  onEditImageUrl,
  date,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess,
  imgDimension,
}) => {
  const [imageUrl, setImageUrl] = useState(onEditImageUrl);
  const [file, setFile] = useState<FileDetails | null>(null);

  const handlePicture = async (file: File) => {
    console.log(file, "YABABABA");

    onSuccess(file);
    setFile({
      file,
      date: new Date().toISOString(),
    });
  };
  useEffect(() => {
    setImageUrl(onEditImageUrl);
  }, [onEditImageUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 5 * 1024 * 1024) {
        toast.error("Maximum of 5mb file allowed");
      } else {
        handlePicture(acceptedFiles[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setFile(null);
    setImageUrl("")
  };

  const altDate = new Date(date).toLocaleDateString()

  return (
    <>
      <ImageWrap>
        <MediaWrap
          $isImageAdded={imageUrl !== ""}
          $disabled={false}
          {...getRootProps()}>
          <ImageUploadIcon />
          <MediaText>
            <input {...getInputProps()} />
            <span>Select Image</span>
          </MediaText>
          <MediaText2>{imgDimension}</MediaText2>
        </MediaWrap>

        <FileView
          date={altDate}
          imageUrl={imageUrl}
          fileDetails={file}
          deleteFile={() => handleRemoveImage()}
        />
      </ImageWrap>
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
  margin-bottom: ${({ $isImageAdded }) => ($isImageAdded ? "90px" : "20px")};
  height: ${({ $isImageAdded }) => ($isImageAdded ? "308px" : "272px")};
  background: ${({ theme }) => theme.colors.gray[30]};
  border: 1px dashed ${({ theme }) => theme.colors.neutral[300]};
  position: relative;

  ${media.tablet`
    height: ${({ $isImageAdded }: { $isImageAdded: boolean }) =>
      $isImageAdded ? "250px" : "200px"};
    margin-bottom: 40px;
  `}

  ${media.mobile`
    height: ${({ $isImageAdded }: { $isImageAdded: boolean }) =>
      $isImageAdded ? "200px" : "180px"};
  `}
`;
