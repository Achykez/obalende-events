'use client';
import { Constant } from '@/api/enums';
import { LogoutIcon, PersonIcon, logo } from '@/assets';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useGetUserRoles } from '@/utils';
import UserProfile from '@/components/userProfile';

export const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(Constant.User);
    router.push('/login');
  };
  const [dropDown, setDropDown] = useState(false);

  const user: IUser | null = useMemo(() => {
    const userString = getCookie(Constant.User)?.toString();
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }, []);

  const userRole = useGetUserRoles();

  return (
    <Container>
      <ContentWrap>
        <LogoWrapper href={'/'}>
          <LogoImage src={logo} alt="logo_image" width={36.57} height={64} />
        </LogoWrapper>
        {user && (
          <UserProfile
            user={user}
            onClick={() => setDropDown((prev) => !prev)}
            userRole={userRole}
          />
        )}
        {dropDown && (
          <DropLink>
            <DropItem onClick={() => router.push('/profile')}>
              <PersonIcon /> <span>Profile</span>
            </DropItem>
            <DropItem onClick={handleLogout}>
              <LogoutIcon /> <span>LogOut</span>
            </DropItem>
          </DropLink>
        )}
      </ContentWrap>
    </Container>
  );
};

const DropLink = styled.div`
  display: flex;
  padding: 4px 15px 15px 15px;
  position: absolute;
  bottom: -70px;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.white};
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  width: 260px;
`;
const DropItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({
      weight: weights.SemiBold,
      variant: variants.HEADER6,
    })}
  svg {
    width: 15px;
    height: 15px;
    stroke: ${({ theme }) => theme.colors.black};
  }
`;

const Container = styled.nav`
  width: 100vw;
  height: 100px;
  @media (max-width: 768px) {
    height: 64px;
  }
`;
const ContentWrap = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 100px;
  position: fixed;
  top: 0px;
  z-index: 5;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[150]};
  @media (max-width: 768px) {
    height: 64px;
    padding: 0px 20px;
  }
`;
const LogoWrapper = styled(Link)`
  padding-right: 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    svg {
      width: 82px;
      height: 23px;
    }
  }
`;
const LogoImage = styled(Image)`
  width: 36.57px;
  height: 64px;
`;
