import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const Home = dynamic(() => import("./home/home"), {
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
const page = () => {
  return <Home />;
};

export default page;
