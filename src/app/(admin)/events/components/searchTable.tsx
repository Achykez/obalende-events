import React, { FC, useMemo, useState } from "react";
import { Space, Table, Dropdown } from "antd";
import styled, { css, keyframes } from "styled-components";
import { ArrowDownIcon, EyeIcon } from "@/assets";
import { EditIcon } from "@/assets/icons/edit-icon";
import { TrashIcon } from "@/assets/icons/trash-icon";
import {
  EventsResponse,
  IEventsPayload,
  useUpdateEventsMutation,
} from "@/redux/api/events";
import { setCookie } from "cookies-next";
import { CookieType } from "@/enums";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/modal";
import { EventStatus } from "@/config";
import { toast } from "react-toastify";
import { RollbackOutlined } from "@ant-design/icons";
interface IProps {
  data?: EventsResponse[];
  isLoading?: boolean;
}
const SearchTable: FC<IProps> = ({ data, isLoading }) => {
  const router = useRouter();
  const [selectEvent, setSelectEvent] = useState<EventsResponse | null>(null);
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventsMutation();
  const dataSource = useMemo(() => {
    return (
      data?.map((item) => {
        return {
          ...item,
          dateStart: new Date(item.event.startTime).toLocaleString(),
          dateEnd: new Date(item.event.endTime).toLocaleString(),
          eventName: item.event.name,
          description: item.event.description ?? "",
          id: item.event._id,
          status: item.event.status,
        };
      }) ?? []
    );
  }, [data]);

  const handleDelete = (data: EventsResponse) => {
    const payload: Partial<IEventsPayload> = {
      status:
        data.event.status === EventStatus.deleted
          ? EventStatus.upcoming
          : EventStatus.deleted,
      description: data.event.description ?? "Deleted",
    };
    console.log(payload);

    updateEvent({
      ...payload,
      eventId: data.event._id,
    })
      .unwrap()
      .then(() => {
        toast.success(`${data.event.name} deleted successfully`);
      })
      .catch(() => {
        toast.error(`Failed to delete ${data.event.name}`);
      });
  };

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
      render: (text: string) => (
        <StatusTag $status={text ?? ""}>{text}</StatusTag>
      ),
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
          <Dropdown
            placement="bottomLeft"
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <OptionItem>
                      <EyeIcon /> View Participants
                    </OptionItem>
                  ),
                  onClick: () => {
                    router.push(`/participants`);
                    setCookie(CookieType.EVENT_ID, record.id);
                  },
                },
                {
                  key: 2,
                  label: (
                    <OptionItem>
                      <EditIcon /> Edit
                    </OptionItem>
                  ),
                  onClick: () => router.push(`events/edit/${record.id}`),
                },
                {
                  key: 3,
                  label: (
                    <OptionItem>
                      {record.status === EventStatus.deleted ? (
                        <>
                          <RollbackOutlined /> Restore Event
                        </>
                      ) : (
                        <>
                          <TrashIcon />
                          Delete Event
                        </>
                      )}
                    </OptionItem>
                  ),
                  onClick: () => {
                    setSelectEvent(record);
                  },
                },
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

  return (
    <>
      {!!selectEvent && (
        <CustomModal
          visible={!!selectEvent}
          title="Delete Event"
          onClose={() => setSelectEvent(null)}
          onAction={() => handleDelete(selectEvent)}
          loading={isUpdating}>
          <DeleteBody>
            Are you sure you want to{" "}
            {selectEvent.event.status === EventStatus.deleted
              ? "Restore"
              : "delete"}{" "}
            <span>{selectEvent.event.name}</span> which contains{" "}
            <span>{selectEvent.participants.length}</span> participants
          </DeleteBody>
        </CustomModal>
      )}
      <Container>
        <ChartTitle>Events</ChartTitle>
        {/* <CardTitle>Search users</CardTitle> */}
        {/* <CardValue>N/A</CardValue> */}

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
            loading={isLoading}
          />
        </TableWrapper>
      </Container>
    </>
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
  height: max-content;
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

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StatusTag = styled.div<{ $status: string }>`
  min-width: 77px;
  padding: 0 6px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $status }) =>
    $status.toLowerCase() === "closed"
      ? theme.colors.darkGreen[400]
      : $status.toLowerCase() === "ongoing"
      ? theme.colors.lightBlue[50]
      : theme.colors.orange[10]};
  color: ${({ theme, $status }) =>
    $status.toLowerCase() === "closed"
      ? theme.colors.text.tertiary
      : $status.toLowerCase() === "ongoing"
      ? theme.colors.blue[700]
      : theme.colors.orange[350]};
  text-align: center;

  // Apply the blink animation if the status is "ongoing"
  ${({ $status }) =>
    $status.toLowerCase() === "ongoing" &&
    css`
      animation: ${blinkAnimation} 2s infinite;
    `}
`;

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

const DeleteBody = styled.div`
  color: ${({ theme }) => theme.colors.neutral[700]};
  span {
    color: ${({ theme }) => theme.colors.darkGreen[500]};
    font-weight: 700;
  }
`;

export default SearchTable;
