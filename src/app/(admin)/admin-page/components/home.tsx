'use client';

import { AppLogo, createEvent, InfoIcon } from '@/assets';
import { Container, Question, OptionsContainer, InfoContainer, Option } from '../../styled-component';

export const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Question>Welcome to Obalande Content Admin</Question>
        <OptionsContainer>
          <Option
            alt="create event"
            link={'/events/create'}
            text="Create Event"
            image={createEvent}
          />
          <Option
            alt="manage event"
            text="Manage Events"
            link={'/events'}
            image={AppLogo}
          />

        </OptionsContainer>
        <InfoContainer>
          <InfoIcon />
          This is the backbone of our Site Here we control the events that are to take place
        </InfoContainer>
      </Container>
    </>
  );
};
