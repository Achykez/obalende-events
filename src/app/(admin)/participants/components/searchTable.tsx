import React, { useState } from "react";
import { Space, Table, Breakpoint } from "antd";
import styled from "styled-components";
import { EyeIcon } from "@/assets";
import { EditIcon } from "@/assets/icons/edit-icon";
import { TrashIcon } from "@/assets/icons/trash-icon";
import { useRouter } from "next/navigation";

const Participants = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const router = useRouter();
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      phoneNumber: "1234567890",
      votes: 10,
      status: "Delivered",
    },
    {
      key: "1",
      name: "John Doe",
      phoneNumber: "1234567890",
      votes: 10,
      status: "Delivered",
    },
    {
      key: "1",
      name: "John Doe",
      phoneNumber: "1234567890",
      votes: 10,
      status: "Delivered",
    },
    {
      key: "1",
      name: "John Doe",
      phoneNumber: "1234567890",
      votes: 10,
      status: "Delivered",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", , "md", "lg"] as Breakpoint[],
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      responsive: ["sm", "md", "lg"] as Breakpoint[],
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
      responsive: ["md", "lg"] as Breakpoint[],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => <StatusTag status={text}>{text}</StatusTag>,
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
      setSelectedRows(selectedRows);
    },
  };

  return (
    <Container>
      <ChartTitle>Participants</ChartTitle>
      <TableWrapper>
        <StyledTable
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
        />
      </TableWrapper>

      <SelectedDataContainer>
        <h4>Selected Rows Data:</h4>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </SelectedDataContainer>
    </Container>
  );
};

export default Participants;

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
  height: auto;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08),
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

  /* Responsive Design */
  @media (max-width: 768px) {
    .ant-table-tbody > tr > td,
    .ant-table-thead > tr > th,
    .ant-table {
      font-size: 10px !important;
    }
  }
`;

const SelectedDataContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.gray};
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  border-radius: 8px;
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
