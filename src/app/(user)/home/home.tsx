"use client"
import React, { useMemo } from "react";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import styles from "./home.module.css";
import { EventStatus } from "@/config";
import { useGetEventsQuery } from "@/redux/api/events";
import { Spin } from "antd";
export default function Home() {
  const { data: eventsData, isLoading } = useGetEventsQuery({});

  // Filter events into upcoming and ongoing based on their status
  const { upcomingEvents, ongoingEvents, closedEvents } = useMemo(() => {
    return eventsData?.data?.reduce(
      (acc, item) => {
        if (item.event.status === EventStatus.upcoming) {
          acc.upcomingEvents.push(item);
        } else if (item.event.status === EventStatus.ongoing) {
          acc.ongoingEvents.push(item);
        } else if (item.event.status === EventStatus.closed) {
          acc.closedEvents.push(item);
        }
        return acc;
      },
      { upcomingEvents: [], ongoingEvents: [],closedEvents: [] },
    ) ?? { upcomingEvents: [], ongoingEvents: [], closedEvents: []};
  }, [eventsData]);
  
  return (
    <Spin spinning={isLoading} className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Main closedEvents={closedEvents}  upcomingData={upcomingEvents} ongoingData={ongoingEvents} />
        <Footer />
      </div>
    </Spin>
  );
}
