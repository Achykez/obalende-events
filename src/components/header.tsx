import {  LogoutIcon, LeftCirleArrow } from "@/assets";
import { CookieType } from "@/enums";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { styled } from "styled-components";
import { UserProfile } from "./userProfile";
import { useGetUser } from "@/utils";

interface IHeader {
  websiteUrl: string;
  title: string;
}
export const Header: FC<IHeader> = ({ websiteUrl, title }) => {
  const user = useGetUser();
  // const userRole = useGetUserRoles();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie(CookieType.TOKEN);
    router.push("/login");
  };

  const [dropDown, setDropDown] = useState(false);

  return (
    <HeaderWrapper>
      <section className="arrow" onClick={() => router.back()}>
        <LeftCirleArrow />
      <WebsiteLink>
        <h5>{title}</h5>
        <Paragraph>{websiteUrl}</Paragraph>
      </WebsiteLink>
      </section>

      {user && (
        <UserProfile
          user={user}
          onClick={() => setDropDown((prev) => !prev)}
          // userRole={userRole}
        />
      )}
      {dropDown && (
        <DropLink>
          {/* <DropItem onClick={() => router.push("/profile")}>
            <PersonIcon /> <span>Profile</span>
          </DropItem> */}
          <DropItem onClick={handleLogout}>
            <LogoutIcon /> <span>LogOut</span>
          </DropItem>
        </DropLink>
      )}
    </HeaderWrapper>
  );
};

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.gray[550]};

  ${({
    theme: {
      typography: { weights, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.SemiBold })};
`;
// const Buttons = styled.div`
//   display: flex;
//   width: fit-content;
//   button {
//     margin-left: 8px;
//   }
// `;

const HeaderWrapper = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.deepGrey};
  border-left: 0.5px solid ${({ theme }) => theme.colors.deepGrey};
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0px 2px 4px 0px rgba(33, 41, 39, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  .arrow {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    flex: 1;

    @media (max-width: 768px) {
    }
  }

  @media (max-width: 768px) {
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: auto;
    padding: 12px 16px;
    font-size: 12px !important;
  }
`;

const WebsiteLink = styled.div`
  max-width: 60%;
  height: auto;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral[50]};
  padding: 8px 12px;
  h5 {
    font-size: 1rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.neutral[1000]};
  }
  p {
    font-size: 0.875rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray[550]};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
    font-size: 12px;
    h5 {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const DropLink = styled.div`
  display: flex;
  position: absolute;
  bottom: -70px;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.background.light};
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 260px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  @media (max-width: 768px) {
    width: 100%;
    bottom: -40px;
    right: 0px;
    position: absolute;
    padding: 10px;
    width: 30%;
  }
`;

const DropItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;

  svg {
    width: 15px;
    height: 15px;
    stroke: ${({ theme }) => theme.colors.text.primary};
  }

  @media (max-width: 768px) {
    gap: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
