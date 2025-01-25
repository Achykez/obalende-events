"use client";

import React from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const UpcomingEvent = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        alignItems: "center",
      }}>
      <Spin spinning size="default" />
    </div>
  ),
});
const page = ({ params: { id } }: { params: { id: string } }) => {
  if (!id) {
    redirect("/");
  }
  return <UpcomingEvent id={id} />;
};

export default page;
