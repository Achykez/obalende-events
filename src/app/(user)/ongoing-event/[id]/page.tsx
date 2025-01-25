import { Spin } from "antd";
import dynamic from "next/dynamic";

const OngoingEvents = dynamic(() => import("./index"), {
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

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <OngoingEvents id={id} />;
}
