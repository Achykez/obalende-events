/* eslint-disable @next/next/no-img-element */
import { FC, useMemo } from "react";
import { Flex, Typography } from "antd";
import { dateTimeFormatter, fileSizeInMegabytes } from "@/utils";
import { DeleteIcon } from "@/assets";
import styled from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface FileDetails {
  file: File;
  date: string;
}

interface Props {
  fileDetails: FileDetails | null;
  deleteFile: () => void;
  imageUrl?: string;
  date: string;
}

export const FileView: FC<Props> = ({
  fileDetails,
  deleteFile,
  imageUrl,
  date,
}) => {
  const fileUrl = useMemo(() => {
    return fileDetails ? URL.createObjectURL(fileDetails.file) : null;
  }, [fileDetails]);

  if (!fileDetails && !imageUrl) {
    return null;
  }

  return (
    <FileViewContainer>
      <ImagePreview>
        <img src={fileUrl || imageUrl || ""} alt={fileDetails?.file.name ?? ""} />
      </ImagePreview>
      <FileDetails>
        <Text>{fileDetails?.file.name}</Text>
        <Text>
          {`${dateTimeFormatter(
            fileDetails?.date ? fileDetails.date : date,
            "MMM D, YYYY"
          )} | ${dateTimeFormatter(fileDetails?.date, "HH:mm a")} • ${
            fileDetails?.file.size
              ? fileSizeInMegabytes(fileDetails?.file.size) + "MB"
              : ""
          }`}
        </Text>
      </FileDetails>
      <Flex align="center" gap="8px">
        <Flex className="pointer" onClick={deleteFile}>
          <DeleteIcon />
        </Flex>
        <a
          href={fileUrl || imageUrl || "#"}
          target="_blank"
          download={fileDetails?.file.name}
          rel="noopener noreferrer">
          <DownloadOutlined />
        </a>
      </Flex>
    </FileViewContainer>
  );
};

export const FileViewContainer = styled.div`
  margin-top: 16px;
  width: 90%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #1c1c1e;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const FileDetails = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const ImagePreview = styled.div`
  width: 58px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #1c1c1e;
  padding: 8px 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
