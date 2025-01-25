import { PageLoader } from "@/components/pageLoader/pageLoader";
import dynamic from "next/dynamic";

const OngoingEvents = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <OngoingEvents id={id} />;
}
