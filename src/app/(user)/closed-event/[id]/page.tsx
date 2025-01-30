"use client";

import React from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { PageLoader } from "@/components/pageLoader/pageLoader";

const ClosedEvents = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <PageLoader />,
});
const page = ({ params: { id } }: { params: { id: string } }) => {
  if (!id) {
    redirect("/");
  }
  return <ClosedEvents id={id} />;
};

export default page;
