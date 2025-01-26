import { EyeIcon, ArrowDownIcon } from "@/assets";
// import { EditIcon } from "@/assets/icons/edit-icon";
// import { TrashIcon } from "@/assets/icons/trash-icon";
import CustomModal from "@/components/modal";
import {
  IParticipant,
  IVotes,
  useValidateVotesMutation,
} from "@/redux/api/participants";
import { Breakpoint, Space, Dropdown, Table } from "antd";
import {
  FC,
  useState,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import ParticipantDetails from "./viewParticipants";
import { toast } from "react-toastify";

interface IProps {
  data?: IVotes[];
  participantData: IParticipant[];
  loading?: boolean;
  id: string;
  setVotes?: Dispatch<SetStateAction<number>>;
}

const UnverifiedVotes: FC<IProps> = ({
  data,
  loading,
  participantData,
  setVotes,
}) => {
  //   const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  //   const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectParticipant, setSelectedParticipant] =
    useState<IParticipant | null>(null);

  const [verifyParticipants, { isLoading: isVerifying }] =
    useValidateVotesMutation();

  const handleVerify = (data: IParticipant) => {
    verifyParticipants(data._id)
      .unwrap()
      .then(() => {
        toast.success(`Verification of ${data.alias} successful`);
        setSelectedParticipant(null);
      })
      .catch(() => {
        toast.error(`Failed to verify ${data.alias}`);
      });
  };

  const dataSource = useMemo(() => {
    const participantMap = new Map(
      participantData.map((user) => [user._id, user])
    );

    return (
      data
        ?.filter((item) => participantMap.has(item.participantId))
        .map((item) => {
          const participant = participantMap.get(item.participantId);

          return {
            key: item._id,
            name: participant?.name || "Unknown",
            phoneNumber: participant?.phoneNumber || "N/A",
            votes: item.numberOfVotes ?? "0",
            image: participant?.image || "",
            alias: participant?.alias || "N/A",
            address: participant?.address || "N/A",
            proof: item.proof,
            ...item,
          };
        }) ?? []
    );
  }, [data, participantData]);

  useEffect(() => {
    setVotes(dataSource.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

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
      title: "Votes Bought",
      dataIndex: "votes",
      key: "votes",
      responsive: ["md", "lg"] as Breakpoint[],
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text: string) => <StatusTag status={text}>{text}</StatusTag>,
    // },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: any) => (
        <Space size="middle">
          <Dropdown
            placement="bottomLeft"
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <OptionItem>
                      <EyeIcon /> View Details
                    </OptionItem>
                  ),
                  onClick: () => {
                    setSelectedParticipant(record);
                  },
                },
                // {
                //   key: 2,
                //   label: (
                //     <OptionItem>
                //       <EditIcon /> Edit
                //     </OptionItem>
                //   ),
                //   onClick: () =>
                //     router.push(`/participants/edit/${record.key}`),
                // },
                // {
                //   key: 3,
                //   label: (
                //     <OptionItem>
                //       <TrashIcon /> Delete
                //     </OptionItem>
                //   ),
                //   onClick: () => {},
                // },
              ],
            }}
            trigger={["click"]}>
            <OptionsButton>
              <p>Action</p>
              <ArrowDownIcon />
            </OptionsButton>
          </Dropdown>
        </Space>
      ),
    },
  ];

  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: (selectedKeys: React.Key[], selectedRows: any[]) => {
  //       setSelectedRowKeys(selectedKeys as string[]);
  //       setSelectedRows(selectedRows);
  //     },
  //   };

  return (
    <Container>
      {!!selectParticipant && (
        <CustomModal
          visible={!!selectParticipant}
          title={`${selectParticipant.alias} Details`}
          onAction={() => {
            handleVerify(selectParticipant!);
          }}
          loading={isVerifying}
          onClose={() => {
            setSelectedParticipant(null);
          }}
          actionText="Verify">
          <ParticipantDetails participant={selectParticipant!} />
        </CustomModal>
      )}
      <ChartTitle>Unverified Votes</ChartTitle>
      <TableWrapper>
        <StyledTable
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showQuickJumper: true,
          }}
          //   rowSelection={rowSelection}
          loading={loading}
        />
      </TableWrapper>
      {/* 
      <SelectedDataContainer>
        <h4>Selected Rows Data:</h4>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </SelectedDataContainer> */}
    </Container>
  );
};

export default UnverifiedVotes;

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

// const SelectedDataContainer = styled.div`
//   margin-top: 16px;
//   padding: 16px;
//   background: ${({ theme }) => theme.colors.background.gray};
//   border: 1px solid ${({ theme }) => theme.colors.gray[30]};
//   border-radius: 8px;
// `;

// const StatusTag = styled.div<{ status: string }>`
//   min-width: 77px;
//   padding: 0 6px;
//   height: 28px;
//   border-radius: 8px;
//   display: flex;
//   font-size: 12px;
//   align-items: center;
//   justify-content: center;
//   background: ${({ theme, status }) =>
//     status.toLowerCase() === "active"
//       ? theme.colors.darkGreen[400]
//       : status.toLowerCase() === "inactive"
//       ? theme.colors.lightBlue[50]
//       : theme.colors.orange[10]};
//   color: ${({ theme, status }) =>
//     status.toLowerCase() === "active"
//       ? theme.colors.text.tertiary
//       : status.toLowerCase() === "inactive"
//       ? theme.colors.blue[700]
//       : theme.colors.orange[350]};
//   text-align: center;
// `;

export const OptionItem = styled.button`
  color: ${({ theme }) => theme.colors.gray[700]};
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  svg {
    width: 15px;
    margin-right: 9px;
  }
  cursor: pointer;
  border: none;
  background: none;
`;

export const OptionsButton = styled.button`
  display: flex;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.blue[50]};
  min-width: 71px;
  height: 28px;
  align-items: center;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  p {
    color: ${({ theme }) => theme.colors.blue[700]};
    margin-left: 8px;
  }
  position: relative;
`;
