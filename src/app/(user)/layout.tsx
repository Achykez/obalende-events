import { AppLogo } from "@/assets";
import type { Metadata } from "next";
import Image from "next/image";



export const metadata: Metadata = {
  title: "Obalende Enugu",
  description: "Get Ready to have immense fun in our karoke website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="not_allowed">
        <div>
          <Image src={AppLogo} alt="Not Allowed" height={250} width={250} />
        </div>
        <p className="title">This site doesn&apos;t support desktop view yet</p>
        <p className="paragraph">Please view on your mobile phone</p>
      </div>
      <div className="user">{children}</div>
    </>
  );
}
