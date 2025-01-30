/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import styles from "./styles.module.css";
import { Calender } from "@/assets/icons/calender";
import Pin from "@/assets/icons/pin";
import { Button } from "antd";
import ArrowBlueRight from "@/assets/icons/arrow-blue-right";
import CalenderImage from "@/assets/images/Calendar.png";
import LocationImage from "@/assets/images/Location.png";
import Image from "next/image";
import { DisplayModal } from "../modal";
import { IParticipant } from "@/redux/api/participants";
import { EventsResponse } from "@/redux/api/events";
import { dateTimeFormatter } from "@/utils";
import { WEBSITE_DETAILS } from "@/config";
import CustomModal from "@/components/modal";
import StepsContent from "@/components/stepForm";
interface IProps {
  eventDetails: EventsResponse | null;
  participantsData: IParticipant[];
  handleShare: () => void;
}
export const KarokeBody: FC<IProps> = ({
  participantsData,
  eventDetails,
  handleShare,
}) => {
  const [apply, setApply] = useState<EventsResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className={styles.mainBody}>
      {!!apply && (
        <CustomModal
          title={`Register for ${eventDetails.event.name}`}
          visible={!!apply}
          onClose={() => setApply(null)}
          onAction={() => {}}
          noFooter>
          <StepsContent
            isEvent
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            close={() => setApply(null)}
            dynamicId={eventDetails?.event._id}
          />
        </CustomModal>
      )}
      <div className={styles.modalContainer}>
        <DisplayModal handleShare={handleShare} data={participantsData} />
      </div>
      <div className={styles.header}>
        <h2>{eventDetails?.event.name}</h2>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.timeContainer}>
          <div className={styles.calenderIcon}>
            <Image src={CalenderImage} alt="calender" width={30} height={30} />
          </div>
          <div>
            <h2>
              {dateTimeFormatter(eventDetails?.event.startTime, "MMM D, YYYY")}
            </h2>
            <p>{dateTimeFormatter(eventDetails?.event.startTime, "HH:mm a")}</p>
          </div>
        </div>
        <div className={styles.timeContainer}>
          <div className={styles.calenderIcon}>
            <Image src={LocationImage} alt="calender" width={30} height={30} />
          </div>
          <div>
            <h2>{WEBSITE_DETAILS.title}</h2>
            <p>{WEBSITE_DETAILS.address}</p>
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionHeader}>
          <h2>About Event</h2>
        </div>
        <div>
          <p className={styles.work}>{eventDetails?.event.description}</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          <Button
            className={styles.button}
            icon={null}
            onClick={() => setApply(eventDetails)}
            style={{
              backgroundColor: "#ed141b",
              padding: "24px 24px",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            Click To Participate
            <ArrowBlueRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
