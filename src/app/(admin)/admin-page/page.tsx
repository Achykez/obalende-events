import { Spin } from "antd";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./components/home",), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        alignItems: "center",
      }}>
      <Spin spinning size="large" />
    </div>
  ),
})
export default function page() {

  return <Home />;
}

