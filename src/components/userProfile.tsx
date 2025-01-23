import React, { FC, MouseEventHandler, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { IUser } from '@/redux/slices';

interface IProfile {
  user: IUser;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const UserProfile: FC<IProfile> = ({ user, onClick }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <DetailsContainer onClick={onClick}>
      <Intials>{`OE`}</Intials>
      <UserProfileText>
        {/* <Username>{`${user?.firstName} ${user?.lastName}`}</Username> */}
        {/* <UserEmail>{userRole ? userRole[0].role.roleName : ''}</UserEmail> */}
      </UserProfileText>
    </DetailsContainer>
  );
};


// ... rest of the code

const DetailsContainer = styled.div`
  display: flex;
  column-gap: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    column-gap: 5px;
  }
`;

const Intials = styled.p`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.background.green};
  background: rgba(221, 221, 221, 0.5);

  @media (max-width: 768px) {
   display: none;
  }
`;

export const UserProfileText = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Username = styled.h6`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const UserEmail = styled.p`
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
