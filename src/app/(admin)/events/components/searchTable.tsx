import React from "react";
import { Space, Table } from "antd";
import styled from "styled-components";
import { EyeIcon } from "@/assets";
import { EditIcon } from "@/assets/icons/edit-icon";
import { TrashIcon } from "@/assets/icons/trash-icon";
import router from "next/router";

const SearchTable = () => {
  const dataSource = [
    {
      key: "1",
      eventName: "Karaoke Night 2025",
      dateStart: "2025-02-01",
      dateEnd: "2025-02-01",
      status: "Upcoming",
      description: "An evening of karaoke fun and competition.",
    },
    {
      key: "2",
      eventName: "Valentine's Karaoke Special",
      dateStart: "2025-02-14",
      dateEnd: "2025-02-14",
      status: "Upcoming",
      description: "Celebrate Valentine's Day with love songs and duets.",
    },
    {
      key: "3",
      eventName: "New Year's Karaoke Party",
      dateStart: "2024-12-31",
      dateEnd: "2025-01-01",
      status: "Completed",
      description: "A fun-filled night to welcome the New Year with music.",
    },
    {
      key: "4",
      eventName: "Weekly Karaoke Championship",
      dateStart: "2025-01-20",
      dateEnd: "2025-01-20",
      status: "Ongoing",
      description: "The weekly championship for aspiring karaoke stars.",
    },
  ];

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Date Start",
      dataIndex: "dateStart",
      key: "dateStart",
    },
    {
      title: "Date End",
      dataIndex: "dateEnd",
      key: "dateEnd",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => <StatusTag status={text}>{text}</StatusTag>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: any) => (
        <Space size="middle">
          <ActionButton
            onClick={() => router.push(`/eshop/orders/${record.id}`)}>
            <EyeIcon />
            <p className="iconText">View</p>
          </ActionButton>
          <ActionButton>
            <EditIcon /> <p className="iconText">Edit</p>
          </ActionButton>
          <ActionButton>
            <TrashIcon />
            <p className="iconText">Delete</p>
          </ActionButton>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <ChartTitle>Events</ChartTitle>
      {/* <CardTitle>Search users</CardTitle> */}
      {/* <CardValue>N/A</CardValue> */}

      <TableWrapper>
        <StyledTable
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </TableWrapper>
    </Container>
  );
};

const TableWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
`;

const ChartTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
`;

const Container = styled.div`
  padding: 16px;
  width: 100%;
  height: 438px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08),
    0px 0px 0px 1px rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    height: max-content;
  }
`;

const StyledTable = styled(Table)`
  margin-top: 24px;

  .ant-table {
    background: ${({ theme }) => theme.colors.background.light};
  }

  .ant-table-thead > tr > th {
    color: ${({ theme }) => theme.colors.neutral[800]};
    background: ${({ theme }) => theme.colors.gray[20]};
  }

  .ant-table-tbody > tr > td {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  .ant-table-tbody > tr > td,
    .ant-table-thead > tr > th,
    .ant-table {
      font-size: 12px !important;
    }

  /* Responsive Design */
  @media (max-width: 768px) {
    .ant-table-tbody > tr > td,
    .ant-table-thead > tr > th,
    .ant-table {
      font-size: 10px !important;
    }
  }
`;

const StatusTag = styled.div<{ status: string }>`
  min-width: 77px;
  padding: 0 6px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  background: ${({ theme, status }) =>
    status.toLowerCase() === "completed"
      ? theme.colors.darkGreen[400] :
    status.toLowerCase() === "ongoing"
      ? theme.colors.lightBlue[50]
      : theme.colors.orange[10]};
  color: ${({ theme, status }) =>
    status.toLowerCase() === "completed"
      ? theme.colors.text.tertiary :
    status.toLowerCase() === "ongoing"
      ? theme.colors.blue[700]
      : theme.colors.orange[350]};
  text-align: center;
`;

const ActionButton = styled.button`
  display: flex;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.light};
  align-items: center;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  @media (max-width: 768px) {
    .iconText {
      display: none;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-left: 8px;
  }

  svg {
    stroke: ${({ theme }) => theme.colors.blue[700]};
  }
`;



export default SearchTable;
