import { FC, useMemo, useState } from "react";
import { KarokeBody } from "./karoke-body";
import { KarokeHeader } from "./karoke-header";
import { useGetEventsQuery } from "@/redux/api/events";
import { useGetEventParticipantQuery } from "@/redux/api/participants";
import { Spin } from "antd";
import { EventStatus, WEB_URL } from "@/config";
import { SocialMediaShare } from "@/components/shareModal";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
}
const UpcomingEvent: FC<IProps> = ({ id }) => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ id });
  const router = useRouter();

  const { data: participantsData, isLoading: isGettingParticipants } =
    useGetEventParticipantQuery(id);

  const eventDetails = useMemo(() => {
    return eventsData?.data?.find((event) => event.event._id === id);
  }, [id, eventsData?.data]);

  const [info, setInfo] = useState<{ url: string; title: string } | null>(null);

  const handleShare = () => {
    setInfo({
      url: `${WEB_URL}/upcoming-events/${eventDetails?.event._id}`,
      title: `Invitation to join ${eventDetails?.event.name}`,
    });
  };

    if (eventDetails && eventDetails.event.status !== EventStatus.upcoming) {
      router.replace("/");
    }

  return (
    <Spin
      spinning={isLoading || isGettingParticipants}
      style={{ display: "flex", flexDirection: "column" }}>
      {info && (
        <SocialMediaShare
          visible={!!info}
          onCancel={() => setInfo(null)}
          title={info.title}
          url={info.url}
        />
      )}
      <KarokeHeader eventDetails={eventDetails} />
      <KarokeBody
        eventDetails={eventDetails}
        participantsData={participantsData?.data ?? []}
        handleShare={handleShare}
      />
    </Spin>
  );
};

export default UpcomingEvent;
