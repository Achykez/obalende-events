import { PageLoader } from "@/components/pageLoader/pageLoader";
import dynamic from "next/dynamic";
import React from "react";

const Home = dynamic(() => import("./home/home"), {
  ssr: false,
  loading: () => <PageLoader />,
});
const page = () => {
  return <Home />;
};

export default page;
